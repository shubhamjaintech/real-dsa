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
let root = buildBst([10, 5, 15, 2, 7]);

// Time: On space: Oh
function preOrder(node) {
    if (node == null) { return; }
    console.log(node.value);
    preOrder(node.left);
    preOrder(node.right);
}
function postOrder(node) {
    if (node === null) {
        return;
    }
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.value);
}
function inOrder(node){
     if (node === null) {
        return;
    }
    inOrder(node.left);
    console.log(node.value);
    inOrder(node.right);
}
inOrder(root);