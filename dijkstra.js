class Edge {
    constructor(v, wt) {
        this.v = v;
        this.wt = wt;
    }
}
class Graph {
    constructor() {
        this.adjList = {};
    }
    addVertex(v) {
        if (!this.adjList[v])
            this.adjList[v] = [];
    }
    addEdge(v1, v2, wt = 0) {
        if (this.adjList[v1].some((n) => n.v === v2) || this.adjList[v2].some((n) => n.v === v1)) {
            console.log('edge exisits');
            return;
        } else {
            this.adjList[v1].push(new Edge(v2, wt));
        }
    }
    print() {
        console.log(JSON.stringify(this.adjList));
    }
    dijkstra(start) {
        let dist = {};
        let visited = new Set();
        // initialize
        for (let v in this.adjList) {
            dist[v] = Infinity;
        }
        dist[start] = 0;
        while (true) {
            let curr = null;
            // find smallest unvisited
            for (let v in dist) {
                if (!visited.has(v) && (curr === null || dist[v] < dist[curr])) {
                    curr = v;
                }
            }
            if (curr === null) break;
            visited.add(curr);
            
            // check neighbors
            for (let neighbor of this.adjList[curr]) {
                let newDist = dist[curr] + neighbor.wt;
                if (newDist < dist[neighbor.v]) {
                    dist[neighbor.v] = newDist;
                }
            }
        }
        return dist;
    }
};

// let g = new Graph();
// g.addVertex('A');
// g.addVertex('B');
// g.addVertex('C');
// g.addVertex('D');

// g.addEdge('A', 'B', 2);
// g.addEdge('A', 'C', 5);
// g.addEdge('B', 'C', 1);
// g.addEdge('B', 'D', 4);
// g.addEdge('C', 'D', 1);

// g.print();
// console.log(g.dijkstra('A'));


const dijkstraTestCases = [
    {
        name: "basic shortest path",
        vertices: ['A', 'B', 'C', 'D'],
        edges: [
            ['A', 'B', 2],
            ['A', 'C', 5],
            ['B', 'C', 1],
            ['B', 'D', 4],
            ['C', 'D', 1],
        ],
        start: 'A',
        expected: {
            A: 0,
            B: 2,
            C: 3,
            D: 4
        }
    },
    {
        name: "disconnected graph",
        vertices: ['A', 'B', 'C'],
        edges: [
            ['A', 'B', 3]
        ],
        start: 'A',
        expected: {
            A: 0,
            B: 3,
            C: Infinity
        }
    },
    {
        name: "single node",
        vertices: ['A'],
        edges: [],
        start: 'A',
        expected: {
            A: 0
        }
    },
    {
        name: "multiple paths choose best",
        vertices: ['A', 'B', 'C'],
        edges: [
            ['A', 'B', 10],
            ['A', 'C', 1],
            ['C', 'B', 1]
        ],
        start: 'A',
        expected: {
            A: 0,
            B: 2,
            C: 1
        }
    }
];

const runDijkstraTests = (testCases) => {
    testCases.forEach((tc) => {
        console.log('Test:', tc.name);

        let graph = new Graph();
        tc.vertices.forEach(v => graph.addVertex(v));
        tc.edges.forEach(([v1, v2, wt]) => {
            graph.addEdge(v1, v2, wt);
        });

        let result = graph.dijkstra(tc.start);

        console.log('Expected:', tc.expected);
        console.log('Actual:  ', result);

        let pass = compareObjects(result, tc.expected);
        console.log('Pass:', pass);
    });
};

function compareObjects(obj1, obj2) {
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
        if (
            (obj1[key] === Infinity && obj2[key] === Infinity) ||
            obj1[key] === obj2[key]
        ) {
            continue;
        }
        return false;
    }
    return true;
}

runDijkstraTests(dijkstraTestCases);