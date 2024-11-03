// Import pathfinding algorithms
const bfs = require("../algorithms/bfs");
const dfs = require("../algorithms/dfs");
const dijkstra = require("../algorithms/dijkstra");
const aStar = require("../algorithms/a_star");
const Graph = require("../utils/graph");

// Existing function to run a single algorithm
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
    case "a*":
      path = aStar(graph, start.row, start.col, end.row, end.col);
      break;
    default:
      throw new Error("Unknown algorithm selected");
  }

  return path;
}

// New function to test all algorithms
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

// Test parameters
const start = { row: 0, col: 0 };
const end = { row: 4, col: 4 };
const obstacles = [
  { row: 1, col: 2 },
  { row: 2, col: 2 },
  { row: 3, col: 2 },
];
const gridSize = { rows: 5, cols: 5 };

// Run the test function
testAllAlgorithms(gridSize, start, end, obstacles);

module.exports = { findPath, testAllAlgorithms };
