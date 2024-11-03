const findPath = require("../controllers/pathFindingController");

// Define test parameters

const start = { row: 0, col: 0 };
const end = { row: 4, col: 4 };

const obstacles = [
  { row: 1, col: 2 },
  { row: 2, col: 2 },
  { row: 3, col: 2 },
];

const gridSize = { rows: 5, cols: 5 };

// Choose algo

const algorithm = "a*";

const path = findPath(algorithm, gridSize, start, end, obstacles); // Call the findPath function with the selected algorithm

// Output the result to the console
console.log(`Algorithm: ${algorithm}`);
console.log("Path found:", path);
console.log("Path length:", path ? path.length : "No path found");
