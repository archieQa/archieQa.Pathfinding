// A* algorithm implementation

const Graph = require("../utils/graph");

// Heuristic function to estimate the distance between two nodes
function heuristic(node, endNode) {
  return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col); // Calculate Manhattan distance
}

// Function to find the shortest path using the A* algorithm
function aStar(graph, startRow, startCol, endRow, endCol) {
  const startNode = graph.grid[startRow][startCol]; // Get the starting node
  const endNode = graph.grid[endRow][endCol]; // Get the ending node
  const openSet = []; // Initialize an empty priority queue to store nodes to be evaluated

  startNode.distance = 0; // Set the distance of the starting node to 0
  openSet.push(startNode); // Add the starting node to the open set

  while (openSet.length > 0) {
    openSet.sort(
      (a, b) =>
        a.distance +
        heuristic(a, endNode) -
        (b.distance + heuristic(b, endNode))
    ); // Sort by f = g + h
    const currentNode = openSet.shift(); // Get the node with the smallest f from the open set

    if (currentNode === endNode) {
      return reconstructPath(currentNode); // If the current node is the end node, return the path
    }

    const neighbors = graph.getNeighbors(currentNode); // Get the neighbors of the current node

    for (const neighbor of neighbors) {
      const tentativeG = currentNode.distance + 1; // Calculate tentative g (distance to the neighbor)

      if (tentativeG < neighbor.distance) {
        neighbor.distance = tentativeG; // Update the neighbor's distance to the shorter tentativeG
        neighbor.previousNode = currentNode; // Set the previous node of the neighbor to the current node

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor); // Add the neighbor to the open set if not already included
        }
      }
    }
  }
  return null; // If the open set is empty and the end node is not reached, return null
}

// Function to reconstruct the path by following previous nodes from the end to the start
function reconstructPath(endNode) {
  const path = []; // Initialize an empty array to store the path
  let currentNode = endNode; // Start with the end node and trace back to the start

  while (currentNode !== null) {
    path.unshift(currentNode); // Add the current node to the start of the path
    currentNode = currentNode.previousNode; // Move to the previous node in the path
  }

  return path; // Return the full path from start to end
}

module.exports = aStar; // Export the aStar function for use in other files
