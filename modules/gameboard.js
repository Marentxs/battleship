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
