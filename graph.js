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
}
// Space: O(V+E)
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');

graph.addEdge('A', 'B');

console.log(graph.adjList);

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

