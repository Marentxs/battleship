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

  makeRandomMove(opponentGameboard) {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);

    return opponentGameboard.receiveAttack(row, col);
  }

  placeRandom(ownShip) {
    let placed = false;

    while (!placed) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);

      const directions = ["horizontal, vertical"];
      const direction = directions[Math.floor(Math.random() * 2)];

      if (this.gameboard.canPlace(ownShip, row, col, direction)) {
        this.gameboard.place(ownShip, row, col, direction);
        placed = true;
      }
    }
  }
}

export default Computer;
export { Player };
