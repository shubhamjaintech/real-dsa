class maxHeap {
    constructor() {
        this.heap = [];
    }
    getParentIdx(i) {
        return Math.floor((i - 1) / 2);
    }
    getLeftIdx(i) {
        return (2 * i + 1);
    }
    getRightIdx(i) {
        return (2 * i + 2);
    }
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    heapifyUp() {
        let maxIdx = this.heap.length - 1;
        while (maxIdx > 0) {
            let parentIdx = this.getParentIdx(maxIdx);
            if (this.heap[parentIdx] >= this.heap[maxIdx]) break;
            this.swap(maxIdx, parentIdx);
            maxIdx = parentIdx;
        }
    }
    heapifyDown() {
        let i = 0;
        while (true) {
            let maxIdx = i;
            let leftIdx = this.getLeftIdx(maxIdx);
            let rightIdx = this.getRightIdx(maxIdx);

            if (maxIdx < this.heap.length && this.heap[maxIdx] < this.heap[leftIdx]) {
                maxIdx = leftIdx;
            }
            if (maxIdx < this.heap.length && this.heap[maxIdx] < this.heap[rightIdx]) {
                maxIdx = rightIdx;
            }
            if(maxIdx === i) break;
            this.swap(i, maxIdx);
            i = maxIdx;
        }
    }
    insert(element) {
        this.heap.push(element);
        this.heapifyUp();
    }
    remove() {
        if (!this.heap.length) {
            return null;
        }
        if (this.heap.length === 1) {
            return this.heap.pop();
        }
        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return max;
    }
}


const maxHeapTestCases = [
    {
        name: "insert single element and remove",
        ops: [
            ['insert', 10],
            ['remove']
        ],
        expected: [10]
    },

    {
        name: "insert multiple elements, remove largest first",
        ops: [
            ['insert', 10],
            ['insert', 50],
            ['insert', 20],
            ['remove'],
            ['remove']
        ],
        expected: [50, 20]
    },

    {
        name: "remove from empty heap",
        ops: [
            ['remove']
        ],
        expected: [null]
    },

    {
        name: "insert ascending values",
        ops: [
            ['insert', 10],
            ['insert', 20],
            ['insert', 30],
            ['insert', 40],
            ['remove'],
            ['remove']
        ],
        expected: [40, 30]
    },

    {
        name: "insert descending values",
        ops: [
            ['insert', 100],
            ['insert', 90],
            ['insert', 80],
            ['insert', 70],
            ['remove'],
            ['remove']
        ],
        expected: [100, 90]
    },

    {
        name: "heap property maintained after multiple removes",
        ops: [
            ['insert', 15],
            ['insert', 100],
            ['insert', 20],
            ['insert', 1],
            ['insert', 50],
            ['remove'],
            ['remove'],
            ['remove']
        ],
        expected: [100, 50, 20]
    },

    {
        name: "duplicate values",
        ops: [
            ['insert', 10],
            ['insert', 10],
            ['insert', 50],
            ['remove'],
            ['remove'],
            ['remove']
        ],
        expected: [50, 10, 10]
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
        expected: [5, -1]
    },

    {
        name: "mixed insert and remove",
        ops: [
            ['insert', 10],
            ['insert', 100],
            ['remove'],
            ['insert', 50],
            ['remove'],
            ['remove']
        ],
        expected: [100, 50, 10]
    },

    {
        name: "all removals sorted descending",
        ops: [
            ['insert', 5],
            ['insert', 1],
            ['insert', 20],
            ['insert', 15],
            ['insert', 50],
            ['remove'],
            ['remove'],
            ['remove'],
            ['remove'],
            ['remove']
        ],
        expected: [50, 20, 15, 5, 1]
    }
];


const runner = (testCases) => {
    testCases.map((tc) => {
        console.log('Test:', tc.name);
        console.log('Expected:', tc.expected);
        let heap = new maxHeap();
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
        console.log('Heap State:', heap.heap);
    });
};

runner(maxHeapTestCases);