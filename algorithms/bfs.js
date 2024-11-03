const Graph = require("./graph");

// Function to find the shortest path using Breadth First Search

function bfs(graph, startRow, startCol, endRow, endCol) {
  const queue = []; // Create a queue to store the nodes to be visited
  const startNode = graph.grid[startRow][startCol]; // Get the start node from the grid
  const endNode = graph.grid[endRow][endCol]; // Get the end node from the grid

  startNode.distance = 0; // Set the distance of the start node to 0
  queue.push(startNode); // Add the start node to the queue

  while (queue.length > 0) {
    const currentNode = queue.shift(); // Get the first node from the queue

    if (currentNode === endNode) {
      // Check if we reached the end node
      return reconstuctPath(endNode); // if yes, return the path
    }

    const neighbors = graph.getNeighbors(currentNode); // Get the neighbors of the current node
    for (const neighbor of neighbors) {
      // Loop through the neighbors
      if (neighbor.distance === Infinity) {
        // Check if the neighbor has been visited
        neighbor.distance = currentNode.distance + 1; // Set the neighbor's distance from the start
        neighbor.previousNode = currentNode; // Set the path to remember where we came from
        queue.push(neighbor); // Add the neighbor to the queue
      }
    }
  }
  return null; // Return null if there is no path
}

// Function to reconstruct the path by follwing the previous nodes from the end node to the start node

function reconstuctPath(endNode) {
  const path = []; // Create an array to store the path
  let currentNode = endNode; // Start from the end node

  while (currentNode !== null) {
    // Loop until we reach the start node
    path.unshift(currentNode); // Add the current node to the start of the path
    currentNode = currentNode.previousNode; // Move to the previous node in the path
  }
  return path; // Return the path
}

module.exports = bfs;
