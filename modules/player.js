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
    const first = Math.floor(Math.random() * 10);
    const second = Math.floor(Math.random() * 10);

    return opponentGameboard.receiveAttack(first, second);
  }
}

export default Computer;
export { Player };
