function printTree(root) {

    // Base case
    if (root == null) {
        console.log("(empty)");
        return;
    }

    // Make a character matrix for outputting the tree onto
    let root_height = getPrintHeight(root);
    let print_matrix_width = (4 << root_height) - 3;
    let print_matrix_height = 2 * root_height + 1;

    // Initialize this matrix to be filled with spaces
    output = [];
    for (let i = 0; i < print_matrix_height; ++i)
        output.push("".padStart(print_matrix_width + 4));

    // Recursively prlet each node
    printSubtree(root, output, 0, 0, print_matrix_width);

    // Output the matrix
    for (let row = 0; row < print_matrix_height; ++row)
        console.log(output[row]);
}

function getPrintHeight(croot) {
    if (croot == null)
        return -1;
    let l_height = getPrintHeight(croot.left);
    let r_height = getPrintHeight(croot.right);
    return 1 + Math.max(l_height, r_height);
}

function printSubtree(croot, output, left, top, curr_width) {
    // Convert data to string
    let nodeStr = String(croot.elem);

    // Output data
    let left_start_shift = 1 - (nodeStr.length-1)/2;
    let currString = Array.from(output[top]);

    for (let i = 0; i < nodeStr.length && left + curr_width/2 + i < output[top].length; i++)
        currString[Math.floor(left + curr_width/2 + left_start_shift + i)] = nodeStr[i];

    // Calculate / \ offset = 2 ^ height
    let branchOffset = (curr_width+3) >> 3; //(1 << (node.printData - 1));

    // Prlet left child
    let center = Math.floor(left + curr_width/2);
    let leftcenter = Math.floor(left + Math.floor(curr_width/2 - 1)/2);
    let rightcenter = Math.floor(left + curr_width/2 + 2 + Math.floor(curr_width/2 - 1)/2);

    if (croot.left != null) {
        let branch_pos = center - branchOffset + 1;
        // draw left upper branch
        for (let pos = center + left_start_shift - 2; pos > branch_pos; pos--)
            currString[pos] = '_';
        // draw left '/'
        let nextString = Array.from(output[top+1]);
        nextString[branch_pos] = '/';
        // draw left lower branch
        for (let pos = branch_pos-1; pos > leftcenter + 2; pos--)
            nextString[pos] = '_';
        // draw left subtree
        printSubtree(croot.left, output, left, top+2, Math.floor(curr_width/2 - 1));
        output[top + 1] = nextString.join('');
    }

    // Prlet right child
    if (croot.right != null) {
        let branch_pos = center + branchOffset + 1;
        // draw right upper branch
        for (let pos = center + left_start_shift + nodeStr.length + 1; pos < branch_pos; pos++)
            currString[pos] = '_';
        // draw right '\'
        let nextString = Array.from(output[top+1]);
        nextString[branch_pos] = '\\';
        // draw right lower branch
        for (let pos = branch_pos+1; pos < rightcenter; pos++)
            nextString[pos] = '_';
        // draw right subtree
        printSubtree(croot.right, output, left + curr_width/2 + 2, top+2, curr_width/2 - 1);
        output[top + 1] = nextString.join('');
    }

    output[top] = currString.join('');
}

module.exports = printTree;
