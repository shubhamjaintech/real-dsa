
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function insert(root, value) {
    if (root === null) {
        root = new Node(value);
    }
    else if (value < root.value) {
        root.left = insert(root.left, value);
    }
    else {
        root.right = insert(root.right, value);
    }
    return root;
}
function buildBst(ar) {
    let root = null;
    for (let i = 0; i < ar.length; i++) {
        root = insert(root, ar[i]);
    }
    return root;

}
// single line input and then print bst
// rl.on("line", (input) => {
//     const arr = input.split(" ").map(Number);
//     console.log(buildBst(arr));
//     rl.close();
// });

// one by one input and then print bst
let root =null;
rl.on('line', (input) => {
    if (input === 'stop') {
        // print tree
        console.log(JSON.stringify(root, null, 2));
        rl.close();
        return;
    } else {
        root = insert(root, Number(input));

    }

})