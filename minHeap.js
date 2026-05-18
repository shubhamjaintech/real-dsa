class minHeap {
  constructor() {
    this.heap = [];
  }
  getLeftIndex(i) {
    return 2 * i + 1;
  }
  getRightIndex(i) {
    return 2 * i + 2;
  }
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }
  heapifyUp() {
    let smallestIdx = this.heap.length - 1;
    while (smallestIdx > 0) {
      let parentIdx = this.getParentIndex(smallestIdx);
      if (this.heap[parentIdx] <= this.heap[smallestIdx]) break;
      this.swap(parentIdx, smallestIdx);
      smallestIdx = parentIdx;
    }
  }
  // Time: O(logn)
  heapifyDown(i) {
    while (true) {
      let smallestIdx = i;
      let leftIdx = this.getLeftIndex(i);
      let rightIdx = this.getRightIndex(i);
      if (
        leftIdx < this.heap.length &&
        this.heap[leftIdx] < this.heap[smallestIdx]
      ) {
        smallestIdx = leftIdx;
      }

      if (
        rightIdx < this.heap.length &&
        this.heap[rightIdx] < this.heap[smallestIdx]
      ) {
        smallestIdx = rightIdx;
      }
      if (smallestIdx === i) {
        break;
      }
      this.swap(smallestIdx, i);
      i = smallestIdx;
    }
  }
  // O(Logn)
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
    let min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return min;
  }
  // build Heap Array Format

  // [50,10,30,20,40]
  // Time: On and not n*logn bcoz most nodes near leaves
  // BUILD HEAP
  // start from last non-leaf
  // heapifyDown backward
  // children fixed before parent
  buildHeap(arr) {
    this.heap = [...arr];
    let startIdx = Math.floor(this.heap.length / 2) - 1; // last non leaf node.
    for (let i = startIdx; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }
}

const heapTestCases = [
  {
    name: "insert - single element",
    ops: [["insert", 10], ["remove"]],
    expected: [10],
  },

  {
    name: "insert multiple elements, remove returns smallest first",
    ops: [
      ["insert", 10],
      ["insert", 5],
      ["insert", 20],
      ["remove"],
      ["remove"],
    ],
    expected: [5, 10],
  },

  {
    name: "remove from empty heap",
    ops: [["remove"]],
    expected: [null],
  },

  {
    name: "insert descending values",
    ops: [
      ["insert", 50],
      ["insert", 40],
      ["insert", 30],
      ["insert", 20],
      ["insert", 10],
      ["remove"],
      ["remove"],
    ],
    expected: [10, 20],
  },

  {
    name: "insert ascending values",
    ops: [["insert", 1], ["insert", 2], ["insert", 3], ["remove"], ["remove"]],
    expected: [1, 2],
  },

  {
    name: "heap property maintained after multiple removes",
    ops: [
      ["insert", 15],
      ["insert", 5],
      ["insert", 20],
      ["insert", 1],
      ["insert", 50],
      ["remove"],
      ["remove"],
      ["remove"],
    ],
    expected: [1, 5, 15],
  },

  {
    name: "duplicate values",
    ops: [
      ["insert", 10],
      ["insert", 10],
      ["insert", 5],
      ["remove"],
      ["remove"],
      ["remove"],
    ],
    expected: [5, 10, 10],
  },

  {
    name: "negative numbers",
    ops: [
      ["insert", -1],
      ["insert", -10],
      ["insert", 5],
      ["remove"],
      ["remove"],
    ],
    expected: [-10, -1],
  },

  {
    name: "single element remove",
    ops: [["insert", 99], ["remove"]],
    expected: [99],
  },

  {
    name: "mixed insert and remove",
    ops: [
      ["insert", 10],
      ["insert", 2],
      ["remove"],
      ["insert", 1],
      ["remove"],
      ["remove"],
    ],
    expected: [2, 1, 10],
  },
];

const runner = (testCases) => {
  testCases.map((tc) => {
    console.log("Test:", tc.name);

    console.log("Expected:", tc.expected);

    let heap = new minHeap();

    let retVal = [];

    tc.ops.map((op) => {
      if (op[0] === "insert") {
        heap.insert(op[1]);
      } else if (op[0] === "remove") {
        retVal.push(heap.remove());
      }
    });

    console.log("Actual:", retVal);

    console.log(
      "Pass:",
      JSON.stringify(retVal) === JSON.stringify(tc.expected),
    );

    console.log("Heap State:", heap.heap);
  });
};

const buildHeapTestCases = [
  {
    name: "random unsorted array",
    input: [50, 40, 30, 20, 10],
    expected: [10, 20, 30, 50, 40],
  },

  {
    name: "already valid min heap",
    input: [1, 2, 3, 4, 5],
    expected: [1, 2, 3, 4, 5],
  },

  {
    name: "descending array",
    input: [9, 8, 7, 6, 5, 4],
    expected: [4, 5, 7, 6, 8, 9],
  },

  {
    name: "single element",
    input: [100],
    expected: [100],
  },

  {
    name: "empty array",
    input: [],
    expected: [],
  },

  {
    name: "duplicate values",
    input: [10, 10, 5, 5, 1],
    expected: [1, 5, 5, 10, 10],
  },

  {
    name: "negative numbers",
    input: [-1, -10, 5, 0],
    expected: [-10, -1, 5, 0],
  },

  {
    name: "mixed positive and negative",
    input: [20, -5, 15, -10, 0],
    expected: [-10, -5, 15, 20, 0],
  },
];
const buildHeapRunner = (testCases) => {
  testCases.map((tc) => {
    console.log("Test:", tc.name);

    let heap = new minHeap();

    heap.buildHeap(tc.input);

    console.log("Input:", tc.input);

    console.log("Expected:", tc.expected);

    console.log("Actual:", heap.heap);

    console.log(
      "Pass:",
      JSON.stringify(heap.heap) === JSON.stringify(tc.expected),
    );
  });
};

buildHeapRunner(buildHeapTestCases);

runner(heapTestCases);
