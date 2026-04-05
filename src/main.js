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
  placeRandom(computerShip);
  placeRandom(computerShip2);
  placeRandom(computerShip3);

  console.log("Start by placing your three ships");

  placementCoordinates(humanShip);
  placementCoordinates(humanShip2);
  placementCoordinates(humanShip3);

  console.log("Now let's get to shooting");

  const turn = "human";

  while (
    human.gameboard.allSunk() !== true &&
    computer.gameboard.allSunk() !== true
  ) {
    if (turn === "human") {
      attackCoordinates(computer);
      turn = "computer";
    } else {
      makeRandomAttack(human);
      turn = "human";
    }
  }

  if (human.gameboard.allSunk() === true) {
    console.log("Computer won, all human ships have been sunk");
  } else {
    console.log("Human won, all computer ships have been sunk");
  }
}

gameLogic();
