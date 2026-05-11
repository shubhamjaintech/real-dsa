class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class MinHeapTree {
    constructor() {
        this.root = null;
        // nodes that are not full yet
        this.queue = [];
    }

    insert(value) {
        const newNode = new Node(value);
        // first node
        if (!this.root) {
            this.root = newNode;
            this.queue.push(newNode);
            return;
        }
        // next available parent
        let parent = this.queue[0];
        newNode.parent = parent;
        // fill left first
        if (!parent.left) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
            // parent complete now
            this.queue.shift();
        }
        // new node can receive children later
        this.queue.push(newNode);
        this.heapifyUp(newNode);
    }

    heapifyUp(node) {

        while (
            node.parent &&
            node.value < node.parent.value
        ) {

            [
                node.value,
                node.parent.value
            ] =
            [
                node.parent.value,
                node.value
            ];

            node = node.parent;
        }
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

            // already valid
            if (smallest === node) break;

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

    remove() {
        if (!this.root) return null;
        // single node
        if (
            !this.root.left &&
            !this.root.right
        ) {

            const val = this.root.value;

            this.root = null;

            this.queue = [];

            return val;
        }

        const min = this.root.value;
        // find last node using BFS
        let q = [this.root];
        let lastNode = null;
        while (q.length) {
            lastNode = q.shift();
            if (lastNode.left) q.push(lastNode.left);
            if (lastNode.right) q.push(lastNode.right);
        }
        // move last node value to root
        this.root.value = lastNode.value;

        // remove last node physically
        let parent = lastNode.parent;

        if (parent.right === lastNode) {
            parent.right = null;
        } else {
            parent.left = null;
        }
        // parent can receive children again
        if (!this.queue.includes(parent)) {
            this.queue.unshift(parent);
        }

        // remove deleted node from queue
        this.queue = this.queue.filter(
            node => node !== lastNode
        );

        this.heapifyDown(this.root);

        return min;
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

const heapTreeTestCases = [
    {
        name: "insert single element and remove",
        ops: [
            ['insert', 10],
            ['remove']
        ],
        expected: [10]
    },

    {
        name: "remove from empty heap",
        ops: [
            ['remove']
        ],
        expected: [null]
    },

    {
        name: "insert multiple elements and remove in sorted order",
        ops: [
            ['insert', 10],
            ['insert', 5],
            ['insert', 20],
            ['insert', 1],
            ['remove'],
            ['remove'],
            ['remove']
        ],
        expected: [1, 5, 10]
    },

    {
        name: "insert descending values",
        ops: [
            ['insert', 50],
            ['insert', 40],
            ['insert', 30],
            ['insert', 20],
            ['insert', 10],
            ['remove'],
            ['remove']
        ],
        expected: [10, 20]
    },

    {
        name: "insert ascending values",
        ops: [
            ['insert', 1],
            ['insert', 2],
            ['insert', 3],
            ['insert', 4],
            ['remove'],
            ['remove']
        ],
        expected: [1, 2]
    },

    {
        name: "duplicate values",
        ops: [
            ['insert', 10],
            ['insert', 10],
            ['insert', 5],
            ['remove'],
            ['remove'],
            ['remove']
        ],
        expected: [5, 10, 10]
    },

    {
        name: "negative numbers",
        ops: [
            ['insert', -1],
            ['insert', -10],
            ['insert', 5],
            ['remove'],
            ['remove']
        ],
        expected: [-10, -1]
    },

    {
        name: "mixed insert and remove",
        ops: [
            ['insert', 10],
            ['insert', 2],
            ['remove'],
            ['insert', 1],
            ['remove'],
            ['remove']
        ],
        expected: [2, 1, 10]
    },

    {
        name: "all removals sorted",
        ops: [
            ['insert', 15],
            ['insert', 5],
            ['insert', 100],
            ['insert', 1],
            ['insert', 50],
            ['remove'],
            ['remove'],
            ['remove'],
            ['remove'],
            ['remove']
        ],
        expected: [1, 5, 15, 50, 100]
    },

    {
        name: "single node tree",
        ops: [
            ['insert', 99],
            ['remove'],
            ['remove']
        ],
        expected: [99, null]
    }
];


const runner = (testCases) => {

    testCases.map((tc) => {

        console.log('Test:', tc.name);

        console.log('Expected:', tc.expected);

        let heap = new MinHeapTree();

        let retVal = [];

        tc.ops.map((op) => {

            if (op[0] === 'insert') {

                heap.insert(op[1]);

            } else if (op[0] === 'remove') {

                retVal.push(heap.remove());
            }
        });

        console.log('Actual:', retVal);

        console.log(
            'Pass:',
            JSON.stringify(retVal) === JSON.stringify(tc.expected)
        );

        console.log(
            'Level Order:',
            heap.levelOrder()
        );
    });
};


runner(heapTreeTestCases);