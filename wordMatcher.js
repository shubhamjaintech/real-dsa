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
        word=word.toLowerCase();
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
         word=word.toLowerCase();
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
function preProcessParaToTrie(paragraph) {
    let wordsArray = paragraph.toLowerCase().replace(/[^a-z\s]/g, '').split(' ');
    console.log(wordsArray);
    let trie = new Trie();
    for (let word of wordsArray) {
        trie.insert(word);
    }
    return trie;
}

let retVal = preProcessParaToTrie('A paragraph is a self-contained unit of writing, consisting of one or more sentences that develop a single, central idea. It typically includes a topic sentence, supporting details, and a concluding sentence that summarizes or bridges to the next idea, ensuring coherence and unity in writing.');

console.log(retVal.search('topic'));