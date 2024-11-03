// Create a class to represent the grid as a graph
class Graph {
  constructor(rows, cols) {
    this.rows = rows; // Store the number of rows in the grid
    this.cols = cols; // Store the number of columns in the grid
    this.grid = this.createGrid(); // Initialize the grid as a 2D array (an array of arrays) of nodes
  }

  // Function to create a grid layout filled with nodes (cells)
  createGrid() {
    const grid = []; // Start with an empty array to store all rows
    for (let row = 0; row < this.rows; row++) {
      // Loop through each row number up to the total rows
      const currentRow = []; // Create an empty array for the current row
      for (let col = 0; col < this.cols; col++) {
        // Loop through each column number up to total columns
        currentRow.push({
          // Add a node (square) in the current row
          row, // Store the row position of the node
          col, // Store the column position of the node
          isStart: false, // Mark if this node is the starting point (initially false)
          isEnd: false, // Mark if this node is the ending point (initially false)
          isObstacle: false, // Mark if this node is an obstacle (initially false)
          distance: Infinity, // Set distance as very high (useful for algorithms)
          previousNode: null, // Track the previous node in the path (none initially)
        });
      }
      grid.push(currentRow); // Add the finished row to the grid array
    }
    return grid; // Return the complete grid with rows and columns of nodes
  }

  // Function to mark a specific node as the starting point
  setStartNode(row, col) {
    this.grid[row][col].isStart = true; // Set start flag
    this.grid[row][col].distance = 0; // Initialize distance to 0 for the start node
  }

  // Function to mark a specific node as the ending point
  setEndNode(row, col) {
    this.grid[row][col].isEnd = true; // Mark the selected node as the end point
  }

  // Function to add an obstacle to a specific node
  addObstacle(row, col) {
    this.grid[row][col].isObstacle = true; // Mark the specified node as an obstacle
  }

  // Helper function to remove start and end markers from all nodes (for easy reselection)
  clearStartAndEnd() {
    for (const row of this.grid) {
      // Loop through each row in the grid
      for (const cell of row) {
        // Loop through each node (cell) in the row
        cell.isStart = false; // Remove start marker if it exists
        cell.isEnd = false; // Remove end marker if it exists
      }
    }
  }

  // Function to get all the neighbors of a specific node
  getNeighbors(node) {
    const { row, col } = node; // Get the row and column of the specified node
    const neighbors = []; // Initialize an empty array to store the neighbors

    // Check the cell above if it exists
    if (row > 0) neighbors.push(this.grid[row - 1][col]); // Add the cell above to the neighbors array
    // Check the cell below if it exists
    if (row < this.rows - 1) neighbors.push(this.grid[row + 1][col]); // Add the cell below to the neighbors array
    // Check the cell to the left if it exists
    if (col > 0) neighbors.push(this.grid[row][col - 1]); // Add the cell to the left to the neighbors array
    // Check the cell to the right if it exists
    if (col < this.cols - 1) neighbors.push(this.grid[row][col + 1]); // Add the cell to the right to the neighbors array

    return neighbors.filter((neighbor) => !neighbor.isObstacle); // Return only neighbors that are not obstacles
  }
}

module.exports = Graph; // Export the Graph class for use in other files
