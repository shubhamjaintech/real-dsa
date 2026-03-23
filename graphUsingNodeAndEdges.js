// Build directed graph with nodes and edges given
// nodes = ["A", "B", "C"];
// edges = [
//     ["A", "B"],
//     ["A", "C"]
// ];

function buildGraph(nodes, edges) {
    this.graph = {};
    for (let i = 0; i < nodes.length; i++) {
        this.graph[nodes[i]] = [];
    }
    for (let i = 0; i < edges.length; i++) {
        this.graph[edges[i][0]].push(edges[i][1]);
    }
    return this.graph;
}

function buildGraphBetter(nodes, edges) {
    this.graph = {};
    for (let n of nodes) {
        this.graph[n] = [];
    }
    for (let e of edges) {
        this.graph[e[0]].push(e[1]);
    }
    return this.graph;
}

// map -> used for non string keys.
const user1 = { id: 1, name: "Shubham" };
const user2 = { id: 2, name: "Rahul" };
const user3 = { id: 3, name: "Jain" }
const nodes =[user1, user2, user3];
const edges =[[user1, user2], [user1, user3]];

function buildGraphUsingMap(nodes, edges) {
    this.graph = new Map();
    for (let node of nodes) {
        this.graph.set(node, []);
    }
    for (let edge of edges) {
        this.graph.get(edge[0]).push(edge[1]);
    }
    return this.graph;
}

console.log(buildGraphUsingMap(nodes, edges));
