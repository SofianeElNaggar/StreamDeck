import {exec} from 'child_process';

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.trim());
    });
  });
}

// Fonction pour envoyer des commandes de touches pour les médias
export async function mediaPlayPause() {
  await executeCommand('nircmd.exe sendkeypress 0xB3'); // Pause
}

export async function mediaNext() {
  await executeCommand('nircmd.exe sendkeypress 0xB0'); // Next Track
}

export async function mediaPrevious() {
  await executeCommand('nircmd.exe sendkeypress 0xB1'); // Previous Track
}

// Exemple d'utilisation
mediaPlayPause();
