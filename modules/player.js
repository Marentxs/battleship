import Gameboard from "./gameboard.js";

class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }
}

class Computer extends Player {
  constructor() {
    super();
  }

  makeRandomMove(opponent) {
    let attacked = false;

    while (!attacked) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);

      if (opponent.gameboard.canAttack(row, col)) {
        attacked = true;
        return opponent.gameboard.receiveAttack(row, col);
      }
    }
  }

  placeRandom(ownShip) {
    let placed = false;

    while (!placed) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);

      const directions = ["horizontal, vertical"];
      const direction = directions[Math.floor(Math.random() * 2)];

      if (this.gameboard.canPlace(ownShip, row, col, direction)) {
        placed = true;
        return this.gameboard.place(ownShip, row, col, direction);
      }
    }
  }
}

export default Computer;
export { Player };
