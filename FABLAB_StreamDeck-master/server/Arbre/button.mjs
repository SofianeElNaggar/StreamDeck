import { arbre } from './arbre.mjs';
import fs from 'fs'

const button = [
    arbre.createTree("button1", 0),
    arbre.createTree("button2", 0),
    arbre.createTree("button3", 0),
    arbre.createTree("button4", 0),
    arbre.createTree("button5", 0),
    arbre.createTree("button6", 0),
];

function getButtons(path) {
    var buttons = button;
    for (const i of path) {
        buttons = arbre.getChild(buttons[i]);
    }
    return getValues(buttons);
}

function getValues(buttons) {
    var value = [];
    for (const i of buttons) {
        value.push(i.value);
    }
    return value;
}

function getChildren(path) {
    var buttons = button;
    for (const i of path) {
        buttons = arbre.getChild(buttons[i]);
    }
    return buttons;
}

function getButtonsOptions(path) {
    var buttons = button;
    for (const i of path) {
        buttons = arbre.getChild(buttons[i]);
    }
    return getOption(buttons);
}

function getOption(buttons) {
    var value = [];
    for (const i of buttons) {
        value.push(i.option);
    }
    return value;
}

function print() {
    for (const i of button) {
        arbre.printTree(i);
    }
    console.log("_______________________")
}

function printLevel(path){
    var buttons = getChildren(path)
    var nbOption = 0;
    for(var node of buttons){
        nbOption ++;
        if(node.option){
            console.log(`${node.value} - Option: ${node.option}`)
        }else{
            console.log(node.value);
        }
    }
    if(nbOption === 5){
        console.log("Return");
    }
    console.log("=============================");
}

function modifTree(i, path, newVal, d, option) {
    var b = button;
    for (const p of path) {
        b = b[p].children;
    }
    b[i] = arbre.createTree(newVal, d, option);
}

function modifAllTree(json) {
    var i = 0;
    for (var b in json) {
        button[i].value = json[b].value;
        button[i].children = json[b].children;
        button[i].option = json[b].option;
        if (json[b].children.length !== 0) {
            const lastCharT = b.charAt(b.length - 1);
            const numberT = parseInt(lastCharT);
            modifierChildren(json[b], i, [numberT-1], button[i].children);
        }
        i++;
    }
}

function modifierChildren(b, i, path, currentButtonChildren) {
    var d = 0;
    if (b.children.length !== 0) {
        d = 1;
    }
    modifTree(i, path, b.value, d, b.option, button);
    if (d === 1) {
        for(var c = 0; c < b.children.length; c++) {
            var p = path.slice();
            p.push(c);
            modifierChildren(b.children[c], i, p, currentButtonChildren[c].children);
        }
    }
}


/**
 * Je sais c'est moche mais j'allais devenir fou
 * @param {*} json 
 */
function updateButtonV2 (json){
    var index = 0;
    for(var b in json){
        if(json[b].value === "new buttons"){
            let newB = arbre.createTree(json[b].value, 1, json[b].option);
            button[index] = newB;
            var index2 = 0
            for(var c of json[b].children){
                if(c.value === "new buttons"){
                    let newB = arbre.createTree(c.value, 1, c.option);
                    button[index].children[index2] = newB;
                    var index3 = 0;
                    for(var c2 of c.children){
                        let newB = arbre.createTree(c2.value, 0, c2.option);
                        button[index].children[index2].children[index3] = newB;
                        index3 ++;
                    }
                }else{
                    let newB = arbre.createTree(c.value, 0, c.option);
                    button[index].children[index2] = newB;
                }
                index2++;
            }
        }else{
            let newB = arbre.createTree(json[b].value, 0, json[b].option);
            button[index] = newB;
        }
        index ++;
    }
}



function save(buttonNumber, depth, path, value, children = [], option) {
    const lastCharT = buttonNumber.charAt(buttonNumber.length - 1);
    const numberT = parseInt(lastCharT);
    if (depth != 0 && numberT < 5 || depth == 0) {
        fs.readFile('./save.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            const lastChar = buttonNumber.charAt(buttonNumber.length - 1);
            const number = parseInt(lastChar);

            let json = JSON.parse(data);

            let current = json;

            if (depth > 0) {
                for (let i = 0; i < depth; i++) {
                    if (i == 0) {
                        var v = path[i] + 1;
                        var p = "button" + v;
                        current = current[p].children;
                    } else {
                        current = current[path[i]].children;
                    }
                }
            }

            var lastIndex;
            if (depth == 0) {
                lastIndex = buttonNumber
            } else {
                lastIndex = number - 1;
            }

            // Vérifier si le numéro de bouton est valide
            if (buttonNumber in json) {
                current[lastIndex].value = value[number - 1];
                current[lastIndex].children = children[number - 1].children;
                current[lastIndex].option = option[number - 1];

                // Écrire les modifications dans le fichier JSON
                fs.writeFile('./save.json', JSON.stringify(json, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
            }
        });
    }
}

export var buttons = {
    button,
    print,
    modifTree,
    getButtons,
    getButtonsOptions,
    getChildren,
    modifAllTree,
    updateButtonV2,
    printLevel,
    save
}