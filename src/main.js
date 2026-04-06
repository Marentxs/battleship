import Ship from "../modules/ship.js";
import Player from "../modules/player.js";
import Computer from "../modules/computer.js";

const human = new Player();
const computer = new Computer();

const humanShip = new Ship(2);
const humanShip2 = new Ship(3);
const humanShip3 = new Ship(4);
const computerShip = new Ship(2);
const computerShip2 = new Ship(3);
const computerShip3 = new Ship(4);

function gameLogic() {
  computer.placeRandom(computerShip);
  computer.placeRandom(computerShip2);
  computer.placeRandom(computerShip3);

  console.log("Start by placing your three ships");

  human.placementCoordinates(humanShip);
  human.placementCoordinates(humanShip2);
  human.placementCoordinates(humanShip3);

  console.log("Now let's get to shooting");

  let turn = "human";

  while (true) {
    if (turn === "human") {
      human.attackCoordinates(computer);

      if (computer.gameboard.allSunk()) {
        return console.log("Human won, all computer ships have been sunk");
      }

      turn = "computer";
    } else {
      computer.makeRandomAttack(human);

      if (human.gameboard.allSunk()) {
        return console.log("Computer won, all human ships have been sunk");
      }

      turn = "human";
    }
  }
}

gameLogic();
