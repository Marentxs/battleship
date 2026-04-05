import Gameboard from "./gameboard.js";

class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }

  placementCoordinates(ship) {
    let row = parseFloat(prompt("Enter row number for ship"));
    let col = parseFlat(prompt("Enter col number for ship"));
    let dir = prompt("Enter direction for ship");

    this.gameboard.place(ship, row, col, dir);
  }

  attackCoordinates(opponent) {
    let row = parseFloat(prompt("Enter row number to attack"));
    let col = parseFloat(prompt("Enter col number to attack"));

    opponent.gameboard.receiveAttack(row, col);
  }
}

export default Player;
