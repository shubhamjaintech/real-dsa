class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class MinHeapTree {
    constructor() {
        this.root = null;
    }
    buildHeap(root) {
        this.root = root;
        this.buildHeapHelper(this.root);
    }
    buildHeapHelper(node) {
        if (!node) return;
        this.buildHeapHelper(node.left);
        this.buildHeapHelper(node.right);
        this.heapifyDown(node);
    }

    heapifyDown(node) {
        while (node) {
            let smallest = node;
            if (
                node.left &&
                node.left.value < smallest.value
            ) {
                smallest = node.left;
            }
            if (
                node.right &&
                node.right.value < smallest.value
            ) {
                smallest = node.right;
            }

            if (smallest === node) {
                break;
            }
            [
                node.value,
                smallest.value
            ] =
            [
                smallest.value,
                node.value
            ];

            node = smallest;
        }
    }
    levelOrder() {
        if (!this.root) return [];
        let result = [];
        let q = [this.root];
        while (q.length) {
            let node = q.shift();
            result.push(node.value);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }

        return result;
    }
    
}


function buildTreeFromArray(arr) {

    if (!arr.length) return null;
    let nodes =
        arr.map(val => new Node(val));
    for (let i = 0; i < arr.length; i++) {
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < arr.length) {
            nodes[i].left = nodes[left];
        }
        if (right < arr.length) {
            nodes[i].right = nodes[right];
        }
    }
    return nodes[0];
}

function isValidMinHeap(root) {

    if (!root) return true;

    if (
        root.left &&
        root.value > root.left.value
    ) {
        return false;
    }

    if (
        root.right &&
        root.value > root.right.value
    ) {
        return false;
    }

    return (
        isValidMinHeap(root.left) &&
        isValidMinHeap(root.right)
    );
}

const buildHeapTreeTestCases = [

    {
        name: "random unsorted tree",
        input: [50, 40, 30, 20, 10]
    },

    {
        name: "already min heap",
        input: [1, 2, 3, 4, 5]
    },

    {
        name: "descending values",
        input: [9, 8, 7, 6, 5, 4]
    },

    {
        name: "single node",
        input: [100]
    },

    {
        name: "empty tree",
        input: []
    },

    {
        name: "duplicate values",
        input: [10, 10, 5, 5, 1]
    },

    {
        name: "negative numbers",
        input: [-1, -10, 5, 0]
    },

    {
        name: "mixed positive and negative",
        input: [20, -5, 15, -10, 0]
    }
];
const runner = (testCases) => {
    testCases.map((tc) => {
        console.log('Test:', tc.name);
        let heap = new MinHeapTree();
        let root =
            buildTreeFromArray(tc.input);
            
        heap.buildHeap(root);
        console.log('Input:', tc.input);
        console.log(
            'Level Order:',
            heap.levelOrder()
        );
        console.log(
            'Valid Min Heap:',
            isValidMinHeap(heap.root)
        );
    });
};


runner(buildHeapTreeTestCases);