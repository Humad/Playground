/**
 * @file main.js
 * This file contains code for output testing of the
 *  BinaryTree class.
 */

let printTree = require('./print-tree');
let random = require('./random');
let BinaryTree = require('./binary-tree');

function output_bold(text) {
    return "\033[31;4m" + text + "\033[39;24m";
}

function output_header(name, desc) {
    let bar = "".padStart(79).replace(/ /g, '~');
    console.log(bar);
    console.log(output_bold(name) + " - " + desc);
    console.log(bar);;
}

function printTreeInfo(tree, name, description) {
    output_header(name, description);
    console.log("height: " + tree.height());
    console.log("ordered: " + tree.isOrdered());
    console.log("sumDistances: " + tree.sumDistances());
    printTree(tree.root);
    console.log();
    console.log("printLeftRight: ");
    tree.printLeftToRight();
    tree.printPaths();
    console.log();
    console.log();
}

function main(args) {
    // Make a random unsorted tree with nodes for 1 through 10
    let myTree = new BinaryTree();
    for (let i = 1; i <= 10; i++)
        myTree.insert(i, false);

    // Prlet the tree
    printTreeInfo(myTree, "Tree", "random unordered tree");

    // Mirror the tree
    myTree.mirror();
    printTreeInfo(myTree, "Mirrored", "the mirror image of the above tree");

    // Make a sorted tree
    // First, create a random ordering to insert 1..10 into the tree
    ordering = []
    for (let num = 1; num <= 10; num++)
        ordering.push({num: num, order: random()});
    ordering.sort((a, b) => a.order - b.order);
    ordering = ordering.map(elem => elem.num);
    // Then create a tree and insert 1..10 shuffled
    myBST = new BinaryTree();
    for (let index = 0; index < 10; index++)
        myBST.insert(ordering[index], true);

    // Prlet the tree
    printTreeInfo(myBST, "BST", "random ordered tree");

    // Mirror the tree
    myBST.mirror();
    printTreeInfo(myBST, "BST Mirrored", "the mirror image of the above BST");

    // Make an almost sorted tree
    for (let num = 1; num <= 10; num++)
        ordering[num-1] = {num: num, order: random()};
    ordering.sort((a, b) => a.order - b.order);
    ordering = ordering.map(elem => elem.num);

    // Then create a tree and insert 1..10 shuffled
    myBST.clear();
    for (let index = 0; index < 4; index++)
        myBST.insert(ordering[index], true);
    myBST.insert(ordering[4], false);

    printTreeInfo(myBST, "Almost BST", "a tree that has one element out of place");
}

main();
