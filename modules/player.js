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
}
