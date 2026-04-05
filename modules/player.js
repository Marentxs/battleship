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
        console.log("Ship placed correctly");
        placed = true;
      } else {
        console.log("Invalid directions, try again");
        continue;
      }
    }
  }

  attackCoordinates(opponent) {
    let attacked = false;
    while (!attacked) {
      let rawRow = prompt("Enter row number to attack");
      let rawCol = prompt("Enter col number to attack");

      if (rawRow === null || rawCol === null) {
        console.log("Game cancelled");
        continue;
      }

      let row = parseFloat(rawRow);
      let col = parseFloat(rawCol);

      if (isNaN(row) || isNaN(col)) {
        console.log("Invalid number, please try again");
        continue;
      }

      if (opponent.gameboard.canAttack(row, col)) {
        opponent.gameboard.receiveAttack(row, col);
        console.log("Attack placed correctly");
        let result = opponent.gameboard.receiveAttack(row, col);
        console.log(`You got a ${result}`);
        attacked = true;
      } else {
        console.log("Invalid attack coordinates, try again");
        continue;
      }
    }
  }
}

export default Player;
