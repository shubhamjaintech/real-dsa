class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    prepend(node) {
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
    }
    removeNode(node) {
        if (node === this.head) {
            this.head = node.next;
        }
        if (node === this.tail) {
            this.tail = node.prev;
        }
        let a = node.prev;
        let c = node.next;
        if (a)
            a.next = c;
        if (c)
            c.prev = a;
        node.next = null;
        node.prev = null;
    }
    deleteLast() {
        if (!this.tail) {
            return null;
        }
        let node = this.tail;
        this.removeNode(node);
        return node;
    }
}


class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.doublyLinkedList = new DoublyLinkedList();
        this.hashmap = new Map();
    }
    put(key, value) {
        if (this.hashmap.has(key)) {
            let node = this.hashmap.get(key);
            node.value = value;
            this.doublyLinkedList.removeNode(node);
            this.doublyLinkedList.prepend(node);
            return;
        }
        if (this.hashmap.size === this.capacity) {
            let deletedNode = this.doublyLinkedList.deleteLast();
            this.hashmap.delete(deletedNode.key);
        }
        let node = new Node(key, value);
        this.hashmap.set(key, node);
        this.doublyLinkedList.prepend(node);
    }
    get(key) {
        if (!this.hashmap.has(key)) {
            return -1;
        }
        let node = this.hashmap.get(key);
        this.doublyLinkedList.removeNode(node);
        this.doublyLinkedList.prepend(node);
        return node.value;

    }
}

// let lru = new LRUCache(3);
// lru.put(1, 1);
// lru.put(2, 20);
// lru.put(9, 100);
// lru.put(3, 30);
// lru.get(2);

const lruTestCases = [
    {
        name: "put - basic and when cache exceed capacity, get - basic",
        capacity: 2,
        ops: [
            ['put', 1, 5],
            ['put', 2, 10],
            ['put', 7, 50],
            ['get', 2]
        ],
        expected: [10]
    },
    {
        name: "put - 1 capacity, get - invalid key",
        capacity: 1,
        ops: [
            ['put', 1, 5],
            ['get', 1],
            ['put', 7, 50],
            ['get', 2]
        ],
        expected: [5,-1]
    },
    {
        name: "update existing key twice",
        capacity: 2,
        ops: [
            ['put', 1, 5],
            ['put', 7, 50],
            ['get', 1],
            ['put', 3, 100],
            ['get', 1],


        ],
        expected: [5, 5]
    },

]

const runner = (testCases) => {

    testCases.map((tc) => {
        console.log('Test:', tc.name);
        console.log('Test Expected', tc.expected)
        let lru = new LRUCache(tc.capacity);
        let retVal = [];
        tc.ops.map((op) => {
            if (op[0] === 'put') {
                lru.put(op[1], op[2]);
            } else if (op[0] === 'get') {
                retVal.push(lru.get(op[1]));
            }
        })
        console.log('Actual: ', retVal);
        console.log('Pass: ', JSON.stringify(retVal) === JSON.stringify(tc.expected))
        console.log('-------')

    })
}

runner(lruTestCases);