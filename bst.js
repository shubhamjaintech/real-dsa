class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function insert(root, value) {
    if (root === null) {
        return new Node(value);
    }
    if (value < root.value) {
        this.insert(root.left, value);
    } else {
        this.insert(root.right, value);
    }
    return root;
}

function buildBst(arr) {
    let root = null;
    for (let i = 0; i < arr.length; i++) {
        root = insert(root, ar[i])
    }
    return root;
}