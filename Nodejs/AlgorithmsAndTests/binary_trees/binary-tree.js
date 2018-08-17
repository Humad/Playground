let random = require('./random');

/**
 * @file binary-tree.js
 * Definitions of the binary tree functions you'll be writing.
 * You'll need to modify this file.
 */
class TreeNode {
    /**
     * Node element constructor; sets children to point to null.
     * @param element The generic data element that the constructed
     *  node will hold.
     */
    constructor(element) {
        this.elem = element;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    /**
     * Definitions of some standard binary tree functions.
     */
    constructor() {
        this.root = null;
    }

    clear() {
        this.root = null;
    }

    insert(elem, sorted) {
        // If we're at a NULL pointer, we can put our element here
        if (this.root == null) {
            this.root = new TreeNode(elem);
        } else {
            let curr = this.root;
            while (true) {
                let temp = Math.floor(random() * 24);
                // If sorted, go left/right based on ordering
                // If random, go left or right based on pseudorandom even/odd
                if (sorted ? (elem < curr.elem) : temp % 2 == 0) {
                    if (curr.left == null) {
                        curr.left = new TreeNode(elem);
                        break;
                    } else {
                        curr = curr.left;
                    }
                } else {// right side / larger
                    if (curr.right == null) {
                        curr.right = new TreeNode(elem);
                        break;
                    } else {
                        curr = curr.right;
                    }
                }
            }
        }
    }

    /**
     * @return The height of the binary tree. Recall that the height of a binary tree
     *  is just the length of the longest path from the root to a leaf.
     */
    height() {
        return this.heightHelper(this.root);
    }

    /**
     * Private helper function for the public height function.
     * @param subRoot the root of the subtree
     * @return The height of the subtree
     */
    heightHelper(subRoot) {
        // Base case
        if (subRoot == null) {
            return -1;
        }

        // Recursive definition
        return 1 + Math.max(this.heightHelper(subRoot.left), this.heightHelper(subRoot.right));
    }

    /**
     * Prints out the values of the nodes of a binary tree in order.
     * That is, everything to the left of a node will be printed out before that node
     *  itself, and everything to the right of a node will be printed out after that node.
     */
    printLeftToRight() {
        // Call recursive helper function on the root
        console.log(this.leftToRightString(this.root));
    }

    /**
     * Private helper function for the public printLeftToRight function.
     * @param subRoot
     */
    leftToRightString(subRoot) {
        // Base case - null node
        if (subRoot == null) {
            return "";
        }

        // Print left subtree
        let left = this.leftToRightString(subRoot.left);

        // Print right subtree
        let right = this.leftToRightString(subRoot.right);

        // combine them
        return left + ' ' + subRoot.elem + right;
    }

    /**
     * Flips the tree over a vertical axis, modifying the tree itself
     *  (not creating a flipped copy).
     */
    mirror() {
        // your code here
        this.root = this.mirrorHelper(root);
    }

    mirrorHelper(currentNode) {
        if (currentNode == null) return null;
        let leftMirrored = this.mirrorHelper(currentNode.right);
        let rightMirrored = this.mirrorHelper(currentNode.left);
        currentNode.right = leftMirrored;
        currentNode.left = rightMirrored;
        return currentNode;
    }

    /**
     * @return True if an in-order traversal of the tree would produce a nondecreasing list
     *  output values, and false otherwise. This is also the criterion for a binary tree to be
     *  a binary search tree.
     */
    isOrdered() {
        // your code here
        return this.isOrderedHelper(this.root, null, null);
    }

    isOrderedHelper(currentNode, minNode, maxNode) {
        if (currentNode == null) return true;
        if ((minNode != null && currentNode.element <= minNode.element) || 
            (maxNode != null && currentNode.element >= maxNode.element)) {
            return false;
        }
        return this.isOrderedHelper(currentNode.left, minNode, currentNode) &&
                this.isOrderedHelper(currentNode.right, currentNode, maxNode);
    }

    /**
     * Prints out all the possible paths from the root of the tree to any leaf node.
     * That is, all sequences starting at the root node and continuing downwards, ending at a
     *  leaf node. Paths ending in a left node should be printed before paths ending in a node
     *  further to the right.
     */
    printPaths() {
        // your code here
        let pathArray = [];
        this.printPathsHelper(this.root, pathArray);
    }

    printPathsHelper(currentNode, pathArray) {
        if (currentNode == null) {
            if (pathArray.length != 0) {
                console.log(pathArray);
            }
            pathArray.pop();
            return;
        }

        pathArray.push(currentNode.elem);
        this.printPathsHelper(currentNode.left, pathArray);
        this.printPathsHelper(currentNode.right, pathArray);
        pathArray.pop();
    }

    /**
     * Each node in a tree has a distance from the root node - the depth of that node,
     *  or the number of edges along the path from that node to the root. This function returns
     *  the sum of the distances of all nodes to the root node (the sum of the depths of all
     *  the nodes). Your solution should take O(n) time, where n is the number of nodes in the tree.
     * @return The sum of the distances of all nodes to the root
     */
    sumDistances() {
        // your code here
        return -1;
    }
}

module.exports = BinaryTree;
