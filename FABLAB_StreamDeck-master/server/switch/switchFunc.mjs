import { upVolume, downVolume } from '../Fonctionallités/son.mjs';
import { brightnessDown, brightnessUp } from '../Fonctionallités/brightness.mjs';
import { buttons } from '../Arbre/button.mjs';
import { openFileOnWindows } from '../Fonctionallités/file.mjs';
import { openWebPage } from '../Fonctionallités/page_web.mjs'
import { captureAndSaveScreenshot } from '../Fonctionallités/screenshot.mjs'
import { mediaNext, mediaPlayPause, mediaPrevious } from '../Fonctionallités/multimedia.mjs'
import { raccourci } from '../Fonctionallités/raccourci.mjs';


export function switchFunc(i, level, buttonsPath) {
    var b = buttons.button;
    for (const p of buttonsPath) {
        b = b[p].children;
    }
    switch (b[i].value) {
        case "brightness up":
            brightnessUp();
            break
        case "brightness down":
            brightnessDown();
            break
        case "Volume up":
            upVolume();
            break
        case "Volume down":
            downVolume();
            break
        case "new buttons":
            level[0]++;
            buttonsPath.push(i)
            return "down_level";
        case "File":
            var option = b[i].option;
            openFileOnWindows(option);
            break
        case "Web":
            var option = b[i].option;
            openWebPage(option);
            break
        case "Screenshot":
            var name = "screenshot_" + formaterDate() + ".png";
            captureAndSaveScreenshot(name);
            break
        case ">||":
            mediaPlayPause();
            break
        case ">|":
            mediaNext();
            break
        case "|<":
            mediaPrevious();
            break
        case "Raccourci":
            var option = b[i].option;
            raccourci(option);
            break
        default:
    }
}

function formaterDate() {
    const dateActuelle = new Date();
    const jour = String(dateActuelle.getDate()).padStart(2, '0');
    const mois = String(dateActuelle.getMonth() + 1).padStart(2, '0'); // Les mois sont indexés à partir de 0, donc on ajoute 1
    const annee = dateActuelle.getFullYear();
    const heure = String(dateActuelle.getHours()).padStart(2, '0');
    const minutes = String(dateActuelle.getMinutes()).padStart(2, '0');
    const secondes = String(dateActuelle.getSeconds()).padStart(2, '0');

    return `${jour}_${mois}_${annee}_${heure}_${minutes}_${secondes}`;
}