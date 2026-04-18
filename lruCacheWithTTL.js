class Node {
    constructor(key, value, ttl) {
        this.key = key;
        this.value = value;
        this.expiry = Date.now() + ttl;
        this.next = null;
        this.prev = null;
    }
    isExpired() {
        return Date.now() > this.expiry;
    }
}
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    prepend(node) {
        node.prev = null;
        node.next = null;
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
    constructor(capacity = 20, ttl = 2000) {
        this.capacity = capacity;
        this.ttl = ttl;
        this.doublyLinkedList = new DoublyLinkedList();
        this.hashmap = new Map();
    }
    get(key) {
        if (!this.hashmap.has(key)) {
            return -1;
        }
        let node = this.hashmap.get(key);
        if (node.isExpired()) {
            this.#delete(node);
            return -1;
        }
        this.doublyLinkedList.removeNode(node);
        this.doublyLinkedList.prepend(node);
        return node.value;
    }
    put(key, value) {
        if (!key || !value) throw new Error("Invalid input");
        if (key.length > 100 || value.length > 100) {
            throw new Error("Max 100 chars allowed");
        }
        if (this.hashmap.has(key)) {
            let node = this.hashmap.get(key);
            node.value = value;
            node.expiry = Date.now() + this.ttl;
            this.doublyLinkedList.removeNode(node);
            this.doublyLinkedList.prepend(node);
            return;
        }
        this.#cleanupExpired();

        if (this.hashmap.size === this.capacity) {
            let deletedNode = this.doublyLinkedList.deleteLast();
            this.hashmap.delete(deletedNode.key);
        }
        let node = new Node(key, value, this.ttl);
        this.hashmap.set(key, node);
        this.doublyLinkedList.prepend(node);
    }

    #delete(node) {
        this.doublyLinkedList.removeNode(node);
        this.hashmap.delete(node.key);
    }

    #cleanupExpired() {
        let curr = this.doublyLinkedList.tail;
        while (curr) {
            if (!curr.isExpired()) break;
            let prev = curr.prev;
            this.#delete(curr);
            curr = prev;
        }
    }
}


let lru = new LRUCache();
lru.put(1, 1);
lru.put(2, 20);
//  console.log(lru.get(1));
// setTimeout(() => {
//     console.log(lru.get(1));
// }, 1500);
setTimeout(() => {
    console.log(lru.get(1));
}, 2500);

const lruTestCases = [{
        name: "put - basic and when cache exceed capacity, get - basic",
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
        ops: [
            ['put', 1, 5],
            ['get', 1],
            ['put', 7, 50],
            ['get', 2]
        ],
        expected: [5, -1]
    },
    {
        name: "update existing key twice",
        ops: [
            ['put', 1, 5],
            ['put', 7, 50],
            ['get', 1],
            ['put', 3, 100],
            ['get', 1],


        ],
        expected: [5, 5]
    },
    {
        name: "expired ttl fix",
        ops: [
            ['put', 1, 5],
            ['put', 7, 50],
            ['get', 1],
        ],
        delay: 2500,
        expected: [-1]
    },

]
const wait = (ms)=>{
    return new Promise(res => setTimeout(res, ms));
}
const runner = async (testCases) => {
    for (let tc of testCases) {
        console.log('Test:', tc.name);
        console.log('Expected:', tc.expected);

        let lru = new LRUCache();
        let retVal = [];

        for (let op of tc.ops) {
            if (op[0] === 'put') {
                lru.put(op[1], op[2]);
            } else if (op[0] === 'get') {
                if (tc.delay) {
                    await wait(tc.delay);
                }
                retVal.push(lru.get(op[1]));
            }
        }

        console.log('Actual:', retVal);
        console.log('Pass:', JSON.stringify(retVal) === JSON.stringify(tc.expected));
        console.log('-------');
    }
};

runner(lruTestCases);