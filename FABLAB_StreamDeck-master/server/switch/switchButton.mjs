import { switchFunc } from "./switchFunc.mjs"
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { buttons } from '../Arbre/button.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


export function switchButton(data, level, buttonsPath) {
    switch (data.button) {
        case "button1":
            return switchFunc(0, level, buttonsPath);
        case "button2":
            return switchFunc(1, level, buttonsPath);
        case "button3":
            return switchFunc(2, level, buttonsPath);
        case "button4":
            return switchFunc(3, level, buttonsPath);
        case "button5":
            return switchFunc(4, level, buttonsPath);
        case "button6":
            if (level > 0) {
                level[0]--;
                buttonsPath.pop();
                return "back_level";
            } else {
                return switchFunc(5, level, buttonsPath);
            }
        case "reset":
            ecraserContenu();
        default:

    }
}


function ecraserContenu() {
    const cheminFichierA = path.resolve(__dirname, `../save.json`);
    const cheminFichierB = path.resolve(__dirname, `../emptySave.json`);
    const contenuB = fs.readFileSync(cheminFichierB, 'utf8');

    fs.writeFileSync(cheminFichierA, contenuB);

    const jsonData = fs.readFileSync(cheminFichierA, 'utf8');
    if (jsonData) {
        const arbresJson = JSON.parse(jsonData);
        buttons.updateButtonV2(arbresJson);
    }
}