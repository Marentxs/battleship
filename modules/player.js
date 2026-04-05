import Gameboard from "./gameboard.js";

class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }

  placementCoordinates(ship) {
    let placed = false;
    while (!placed) {
      let rawRow = prompt("Enter row number for ship");
      let rawCol = prompt("Enter col number for ship");
      let rawDir = prompt("Enter direction for ship");

      if (rawRow === null || rawCol === null || rawDir === null) {
        console.log("Game cancelled");
        continue;
      }

      let row = parseFloat(rawRow);
      let col = parseFloat(rawCol);
      let dir = rawDir.toLowerCase();

      if (isNaN(row) || isNaN(col)) {
        console.log("Invalid number, please try again");
        continue;
      }

      if (this.gameboard.canPlace(ship, row, col, dir)) {
        this.gameboard.place(ship, row, col, dir);
        placed = true;
      } else {
        console.log("Invalid directions, try again");
        continue;
      }
    }
  }

  attackCoordinates(opponent) {
    let row = parseFloat(prompt("Enter row number to attack"));
    let col = parseFloat(prompt("Enter col number to attack"));

    opponent.gameboard.receiveAttack(row, col);
  }
}

export default Player;
