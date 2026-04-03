class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function insert(root, value) {
    if (root == null) {
        return new Node(value);
    }
    if (value < root.value) {
        root.left = insert(root.left, value);
    }
    else {
        root.right = insert(root.right, value);
    }
    return root;
}
// Time: Worst: O(n2) Avg: O(nlogn)
function buildBst(arr) {
    let root = null;
    for (let i = 0; i < arr.length; i++) {
        root = insert(root, arr[i]);
    }
    return root;
}
// Time: O(n)
function buildBalancedBst(arr, left = 0, right = arr.length - 1) {
    if (left > right) return null;
    let mid = Math.floor((left + right) / 2);
    let root = new Node(arr[mid]);

    root.left = buildBalancedBst(arr, left, mid - 1);
    root.right = buildBalancedBst(arr, mid + 1, right);

    return root;

}
// console.log(buildBst([1,2,3,4,5]))
console.log(buildBalancedBst([1, 2, 3, 4, 5]));