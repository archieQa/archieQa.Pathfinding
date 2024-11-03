// Import necessary modules and pathfinding algorithms
const express = require("express");
const bfs = require("../algorithms/bfs");
const dfs = require("../algorithms/dfs");
const dijkstra = require("../algorithms/dijkstra");
const aStar = require("../algorithms/a_star");
const Graph = require("../utils/graph");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware to enable CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://archie-qa-pathfinding-fe.vercel.app",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// Middleware to parse JSON request body
app.use(express.json());

// Handle preflight requests for /find-path explicitly
app.options(
  "/find-path",
  cors({
    origin: [
      "http://localhost:5173",
      "https://archie-qa-pathfinding-fe.vercel.app",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// Function to execute a single algorithm based on the user's choice
function findPath(algorithm, gridSize, start, end, obstacles) {
  const graph = new Graph(gridSize.rows, gridSize.cols);
  graph.setStartNode(start.row, start.col);
  graph.setEndNode(end.row, end.col);
  obstacles.forEach((obstacle) =>
    graph.addObstacle(obstacle.row, obstacle.col)
  );

  let path = null;

  switch (algorithm) {
    case "bfs":
      path = bfs(graph, start.row, start.col, end.row, end.col);
      break;
    case "dfs":
      path = dfs(graph, start.row, start.col, end.row, end.col);
      break;
    case "dijkstra":
      path = dijkstra(graph, start.row, start.col, end.row, end.col);
      break;
    case "a_star":
      path = aStar(graph, start.row, start.col, end.row, end.col);
      break;
    default:
      throw new Error("Unknown algorithm selected");
  }

  return path;
}

// Endpoint to handle frontend requests for pathfinding
app.post("/find-path", (req, res) => {
  try {
    const { algorithm, gridSize, start, end, obstacles } = req.body;
    const path = findPath(algorithm, gridSize, start, end, obstacles);
    res.json({ path });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Function to test all algorithms and log paths (for testing/debugging purposes)
function testAllAlgorithms(gridSize, start, end, obstacles) {
  const algorithms = {
    bfs,
    dfs,
    dijkstra,
    a_star: aStar,
  };

  Object.keys(algorithms).forEach((algorithmName) => {
    const graph = new Graph(gridSize.rows, gridSize.cols);
    graph.setStartNode(start.row, start.col);
    graph.setEndNode(end.row, end.col);
    obstacles.forEach((obstacle) =>
      graph.addObstacle(obstacle.row, obstacle.col)
    );

    const path = algorithms[algorithmName](
      graph,
      start.row,
      start.col,
      end.row,
      end.col
    );
    console.log(`Algorithm: ${algorithmName.toUpperCase()}`);
    console.log("Path found:", path);
    console.log("Path length:", path ? path.length : "No path found");
    console.log("---");
  });
}

// Test parameters for debugging purposes
const start = { row: 0, col: 0 };
const end = { row: 4, col: 4 };
const obstacles = [
  { row: 1, col: 2 },
  { row: 2, col: 2 },
  { row: 3, col: 2 },
];
const gridSize = { rows: 5, cols: 5 };

// Run the test function (uncomment to run all algorithms in the console)
// testAllAlgorithms(gridSize, start, end, obstacles);

// Start the server
app.listen(port, () => {
  console.log(`Pathfinding API running at http://localhost:${port}`);
});

module.exports = { findPath, testAllAlgorithms };
