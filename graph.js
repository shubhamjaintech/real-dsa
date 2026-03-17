// Using Adjaceny List
class Graph {
    constructor() {
        this.adjList = {};
    }
    // Time: O(1)
    addVertex(vertex) {
        if (!this.adjList[vertex]) {
            this.adjList[vertex] = []
        }
    }
    // Time: O(1)
    addEdge(v1, v2) {
        this.adjList[v1].push(v2);
        this.adjList[v2].push(v1);
    }

    // undirected approach
    checkEdge(v1, v2) {
        let retVal = false;
        const list1 = this.adjList[v1];
        if (list1) {
            for (let i = 0; i < list1.length; i++) {
                if (list1[i] === v2) {
                    retVal = true;
                    break;
                }
            }
        }
        return retVal;
    }
    //undirected approach
    checkEdgeBetter(v1, v2){
        return this.adjList[v1]?.includes(v2) || false;
    }
}
// Space: O(V+E)
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');

graph.addEdge('A', 'B');

console.log(graph.adjList);
console.log(graph.checkEdge('A', 'B'))
// Using Graph Matrix

class GraphMatrix {
    constructor(size) {
        // 2d array [
        //  [0,0,0],
        //  [0,0,0],
        //  [0,0,0]
        // ]
        this.matrix = new Array(size).fill(0).map(() => new Array(size).fill(0));
    }

    // Time = O(1) 
    addEdge(v1, v2) {
        this.matrix[v1][v2] = 1;
        this.matrix[v2][v1] = 1;
    }
}
// Space: O(vsquare)
const graphm = new GraphMatrix(3);

graphm.addEdge(0, 1);
graphm.addEdge(0, 2);

console.log(graphm.matrix);

