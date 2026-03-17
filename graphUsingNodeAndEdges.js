
// Build undirected graph with nodes and edges given
nodes = ["A", "B", "C"];
edges = [
    ["A", "B"],
    ["A", "C"]
];

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
    for(let n of nodes){
        this.graph[n]=[];
    }
    for( let e of edges){
        this.graph[e[0]].push(e[1]);
    }
    return this.graph;
}

console.log(buildGraphBetter(nodes, edges));
