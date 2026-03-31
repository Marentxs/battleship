class Gameboard {
  constructor() {
    this.grid = [];
    this.ships = [];
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
      this.ships.push(ship);
    }
    if (direction === "vertical") {
      for (let i = 0; i < size; i++) {
        this.grid[row + i][column] = ship;
      }
      this.ships.push(ship);
    }
  }

  receiveAttack(row, column) {
    const target = this.grid[row][column];

    if (target === "hit" || target === "miss") {
      throw new Error("You already shot here");
    }

    if (target !== null) {
      target.hit();
      this.grid[row][column] = "hit";
      return "hit";
    } else {
      this.grid[row][column] = "miss";
      return "miss";
    }
  }

  allSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
