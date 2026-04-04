import Ship from "../modules/ship.js";
import Computer, { Player } from "../modules/player.js";

const human = new Player();
const computer = new Computer();

const humanShip = new Ship(2);
const humanShip2 = new Ship(3);
const humanShip3 = new Ship(4);
const computerShip = new Ship(2);
const computerShip2 = new Ship(3);
const computerShip3 = new Ship(4);

const turn = "human";

while (
  human.gameboard.allSunk() !== true &&
  computer.gameboard.allSunk() !== true
) {
  if (turn === "human") {
    // Logic for human attack via console
    turn = "computer";
  } else {
    // Calls function for random attack
    turn = "human";
  }
}
// if game ended check who lost all ships, console log loser
