import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { switchAction } from './switch/switchAction.mjs';
import { buttons } from './Arbre/button.mjs';
import { arbre } from './Arbre/arbre.mjs';
import { bleco } from './PythonToJson.mjs';
import kleur from 'kleur';
import network from 'network';

//------------ Couleur ------------
const info = kleur.blue;
//----------------------------------

// Supprimer l'avertissement Iconv-lite
process.stderr.write = () => {};

const app = express();
const server = http.createServer(app);
const port = 3000;


let level = [0];
let buttonsPath = [];
const activeConnections = new Set();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname), { 'extensions': ['html', 'css'] }));
app.use(express.static(path.resolve(__dirname, '../client'), { 'extensions': ['html', 'css'] }));

app.use(express.json());

bleco(level,buttonsPath)
const jsonData = fs.readFileSync('save.json', 'utf8');
if (jsonData) {
  const arbresJson = JSON.parse(jsonData);
  buttons.updateButtonV2(arbresJson);
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.post('/', async (req, res) => {
  const receivedData = req.body;
  //console.log('Données JSON reçues du client :', receivedData);

  if(receivedData.button === "reset"){
    level = [0];
    buttonsPath = [];
  }

  const info =  switchAction(receivedData, level, buttonsPath);

  buttons.printLevel(buttonsPath);

  var buttonsValues = buttons.getButtons(buttonsPath);
  var buttonsChildren = buttons.getChildren(buttonsPath);
  var buttonsOptions = buttons.getButtonsOptions(buttonsPath);

  buttons.save(receivedData.button, level, buttonsPath, buttonsValues, buttonsChildren, buttonsOptions);

  if (info === "down_level") {
    res.json({ action: 'down', level: level, path: buttonsPath, buttonsValues, option: buttonsOptions });
  } else if (info === "back_level") {
    res.json({ action: 'back', level: level, path: buttonsPath, buttonsValues, option: buttonsOptions });
  } else {
    res.json({ action: 'ok', level: level, path: buttonsPath, buttonsValues, option: buttonsOptions });
  }
});

// Gestion des connexions
server.on('connection', (connection) => {
  disconnectExistingConnections(connection);
  activeConnections.add(connection);
});

server.listen(port, () => {
  console.log(info(`Serveur Node.js en cours d'exécution sur http://localhost:${port}`));
  console.log();
  network.get_active_interface((err, iface) => {
    console.log();
    console.log(info("Pour se connecter à l'application web via telephone, utilisez l'addresse suivante : http://" + iface.ip_address + ":" + port));
    console.log();
  });
});

// Gestion des déconnexions
server.on('close', () => {
  console.log('Server closed');
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server closed gracefully');
    process.exit(0);
  });
});

function disconnectExistingConnections(newConnection) {
  activeConnections.forEach((connection) => {
    if (connection !== newConnection) {
      connection.end();
      activeConnections.delete(connection);
    }
  });
}
