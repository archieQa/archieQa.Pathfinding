// Depth first search algorithm

const Graph = require("../utils/graph");

// Function to find the shortest path using Depth First Search

function dfs(graph, startRow, startCol, endRow, endCol) {
  const stack = []; // Create a stack to store the nodes to be visited
  const startNode = graph.grid[startRow][startCol]; // Get the start node from the grid
  const endNode = graph.grid[endRow][endCol]; // Get the end node from the grid

  startNode.distance = 0; // Set the distance of the start node to 0
  stack.push(startNode); // Add the start node to the stack

  while (stack.length > 0) {
    // Loop while there are node in the stack
    const currentNode = stack.pop(); // Remove last node added to the stack

    if (currentNode === endNode) {
      return reconstrcutPath(endNode); // if yes, return the path
    }

    const neighbors = graph.getNeighbors(currentNode); // Get the neighbors of the current node
    for (const neighbor of neighbors) {
      // Loop through the neighbors
      if (neighbor.distance === Infinity) {
        // Check if the neighbor has been visited
        neighbor.distance = currentNode.distance + 1; // Set the neighbor's distance from the start
        neighbor.previousNode = currentNode; // Set the path to remember where we came from
        stack.push(neighbor); // Add the neighbor to the stack
      }
    }
  }
  return null; // Return null if there is no path
}

function reconstrcutPath(endNode) {
  const path = []; // Create an array to store the path
  let currentNode = endNode; // Start from the end node

  while (currentNode !== null) {
    // Loop until we reach the start node
    path.unshift(currentNode); // Add the current node to the start of the path
    currentNode = currentNode.previousNode; // Move to the previous node in the path
  }

  return path; // Return the path
}

module.exports = dfs;
