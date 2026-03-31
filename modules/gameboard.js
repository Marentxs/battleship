class Gameboard {
  constructor() {
    this.grid = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(null);
      }
      this.grid.push(row);
    }
  }

  place(ship, row, column, direction) {
    const size = ship.length;

    if (direction !== "horizontal" && direction !== "vertical") {
      direction = "horizontal";
    }

    if (direction === "horizontal" && column + size > 10)
      throw new Error("Out of grid, check row and column");
    if (direction === "vertical" && row + size > 10)
      throw new Error("Out of grid, check row and column");

    if (direction === "horizontal") {
      for (let i = 0; i < size; i++) {
        this.grid[row][column + i] = ship;
      }
    }
    if (direction === "vertical") {
      for (let i = 0; i < size; i++) {
        this.grid[row + i][column] = ship;
      }
    }
  }
}

export default Gameboard;
