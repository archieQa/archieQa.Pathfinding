// The dijkstra algorithm

const { constants } = require("buffer");
const Graph = require("../utils/graph");

// Function to find the shortest path with dijkstra algorithm

function dijkstra(graph, startRow, startCol, endRow, endCol) {
  const startNode = graph.grid[startRow][startCol]; // Start node
  const endNode = graph.grid[endRow][endCol]; // End node
  const unvisitedNodes = []; // UnVisited nodes

  startNode.distance = 0; // Distance from start node to start node is
  unvisitedNodes.push(startNode); // Add start node to unvisited nodes

  while (unvisitedNodes.length > 0) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance); // Sort the queue to get the smallest distrance node
    const currentNode = unvisitedNodes.shift(); // Remove the node with the smallest distance from the queue

    if (currentNode === endNode) {
      // If the current node is the end node
      return reconstructPath(endNode); // Return the path
    }

    // Get all the accessible neighborign nodes for the current Node

    const neighbors = graph.getNeighbors(currentNode);
    for (const neighbor of neighbors) {
      const newDistance = currentNode.distance + 1; // Calculate distance to neiggbor node
      if (newDistance < neighbor.distance) {
        neighbor.distance = newDistance; // Update the distance to the neighbor node
        neighbor.previousNode = currentNode; // Update the previous node to the neighbor node
        unvisitedNodes.push(neighbor); // Add the neighbor node to the unvisited nodes
      }
    }
  }
  return null; // If no path is found
}

function reconstructPath(endNode) {
  // Function to reconstruct the path
  const path = []; // The path
  let currentNode = endNode; // Start from the end node

  while (currentNode !== null) {
    //  While the current node is not null
    path.unshift(currentNode); // Add the current node to the path
    currentNode = currentNode.previousNode; // Move to the previous node
  }
  return path; // Return the path
}

module.exports = dijkstra; // Export the dijkstra function
