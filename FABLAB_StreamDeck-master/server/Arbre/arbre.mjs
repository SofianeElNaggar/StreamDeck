class Node {
    constructor(value, option) {
        this.value = value;
        this.children = [];
        this.option = option;
    }

    addChild(child) {
        this.children.push(child);
    }

    isLeaf() {
        return this.children.length === 0;
    }
}

function createTree(value, depth, option) {
    if (depth === 0) {
        return new Node(value, option);
    }

    const node = new Node(value, option);

    for (let i = 1; i <= 6; i++) {
        if(i === 6){

        }else{
            const childValue = `${value}-${i}`;
            const childNode = createTree(childValue, depth - 1);
            node.addChild(childNode);
        }
    }

    return node;
}

function getChild(arbre){
    var childs = [];
    if(isLeafFunc(arbre)){
        return;
    }
    for (const child of arbre.children) {
        childs.push(child);
    }
    return childs;
}

function isLeafFunc(arbre){
    if(arbre.isLeaf()){
        return true;
    }
    return false;
}

function printTree(node, depth = 0) {
    const indent = '  '.repeat(depth);
    if(node.option){
        console.log(`${indent} ${node.value} - Option: ${node.option}`);
    }else{
        console.log(`${indent} ${node.value}`);
    }

    if (node.isLeaf()) {
        return;
    }

    for (const child of node.children) {
        printTree(child, depth + 1);
    }
}

function jsonToTree(json) {
    const trees = [];

    // Parcourir chaque clé dans le JSON
    Object.keys(json).forEach(key => {
        const node = new Node(json[key].value);

        // Si le nœud a des enfants, ajoutez-les récursivement
        if (json[key].children.size > 0) {
            json[key].children.forEach(childJson => {
                const childNode = jsonToTree(childJson);
                node.addChild(childNode);
            });
        }
        
        // Ajouter l'arbre à la liste des arbres
        trees.push(node);
    });

    return trees;
}

export const arbre = {
    createTree,
    printTree,
    isLeafFunc,
    getChild,
    jsonToTree
}

/*const button = [
    createTree("Bouton 1", 0),
    createTree("Bouton 2", 0),
    createTree("Bouton 3", 0, "test"),
    createTree("Bouton 4", 0),
    createTree("Bouton 5", 0),
    createTree("Bouton 6", 0),
];

for (const i of button) {
    arbre.printTree(i);
}*/
