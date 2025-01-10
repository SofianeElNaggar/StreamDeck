import { buttons } from "../Arbre/button.mjs"

export function switchDrop(data, level, buttonsPath, option) {
    
    switch (data.button) {
        case "button1":
            return editContent(0, buttonsPath, data.text, option);
        case "button2":
            return editContent(1, buttonsPath, data.text, option);
        case "button3":
            return editContent(2, buttonsPath, data.text, option);
        case "button4":
            return editContent(3, buttonsPath, data.text, option);
        case "button5":
            return editContent(4, buttonsPath, data.text, option);
        case "button6":
            return editContent(5, buttonsPath, data.text, option);
        default:

    }
}

async function editContent(i, path, text, option) {
    switch (text) {
        case "new buttons":
            if(path.length<2){
                buttons.modifTree(i, path, text, 1, option);
            }
            break
        case "File":
            buttons.modifTree(i, path, text, 0, option);
            break
        case "Web":
            buttons.modifTree(i, path, text, 0, option);
            break
        case "Raccourci":
            buttons.modifTree(i, path, text, 0, option);
            break
        default:
            buttons.modifTree(i, path, text, 0);
            break
    }
}