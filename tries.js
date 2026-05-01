class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];

        }
        node.isEnd = true;
    }
    search(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEnd;
    }
    print() {
        console.log(JSON.stringify(this.root));
    }

}

let trie = new Trie();
trie.insert('cat');
trie.insert('car');

trie.print();
console.log(trie.search('car'));
const trieTestCases = [
    {
        name: "basic insert + search",
        ops: [
            ['insert', 'cat'],
            ['insert', 'car'],
            ['search', 'cat'],
            ['search', 'car'],
            ['search', 'can']
        ],
        expected: [true, true, false]
    },
    {
        name: "search before insert",
        ops: [
            ['search', 'dog'],
            ['insert', 'dog'],
            ['search', 'dog']
        ],
        expected: [false, true]
    },
    {
        name: "prefix but not full word",
        ops: [
            ['insert', 'apple'],
            ['search', 'app']
        ],
        expected: [false]
    },
    {
        name: "multiple words with shared prefix",
        ops: [
            ['insert', 'bat'],
            ['insert', 'ball'],
            ['insert', 'bald'],
            ['search', 'bat'],
            ['search', 'ball'],
            ['search', 'bald'],
            ['search', 'ba']
        ],
        expected: [true, true, true, false]
    },
    {
        name: "duplicate insert",
        ops: [
            ['insert', 'cat'],
            ['insert', 'cat'],
            ['search', 'cat']
        ],
        expected: [true]
    },
    {
        name: "empty trie search",
        ops: [
            ['search', 'anything']
        ],
        expected: [false]
    }
];

const runner = (testCases) => {
    testCases.map((tc) => {
        console.log('Test:', tc.name);
        console.log('Expected:', tc.expected);

        let trie = new Trie();
        let retVal = [];

        tc.ops.map((op) => {
            if (op[0] === 'insert') {
                trie.insert(op[1]);
            } else if (op[0] === 'search') {
                retVal.push(trie.search(op[1]));
            }
        });

        console.log('Actual:', retVal);
        console.log('Pass:', JSON.stringify(retVal) === JSON.stringify(tc.expected));
    });
};

runner(trieTestCases);