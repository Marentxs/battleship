import Ship from "../modules/ship.js";
import Player from "../modules/player.js";
import Computer from "../modules/computer.js";
import "./styles.css";

const human = new Player();
const computer = new Computer();

//Generate ownBoard and place listener

const ownBoard = document.getElementById("ownBoard");
const opposingBoard = document.getElementById("oppossingBoard");

for (let row = 0; row < 10; row++) {
  for (let col = 0; col < 10; col++) {
    const btn = document.createElement("button");
    btn.dataset.row = row;
    btn.dataset.col = col;
    ownBoard.appendChild(btn);

    btn.addEventListener("click", () => {
      if (gamePhase !== "place") return;

      let row = parseInt(btn.dataset.row);
      let col = parseInt(btn.dataset.col);
      let current = shipsHuman[currentShipIndex];

      if (human.gameboard.canPlace(current, row, col, direction)) {
        human.gameboard.place(current, row, col, direction);
        syncBoard(ownBoard, human.gameboard);
        currentShipIndex++;

        if (currentShipIndex === shipsHuman.length) {
          gamePhase = "attack";
          shipInfo.textContent =
            "All ships placed! Click opponent board to attack";
          computer.placeRandom(shipsComputer[0]);
          computer.placeRandom(shipsComputer[1]);
          computer.placeRandom(shipsComputer[2]);
          computer.placeRandom(shipsComputer[3]);
        }
      } else {
        errorInfo.textContent = "Invalid cell to place try another cell";
      }
    });
  }
}

//Visual update

function syncBoard(boardElement, gameboardObject) {
  boardElement.querySelectorAll("button").forEach((btn) => {
    let row = parseInt(btn.dataset.row);
    let col = parseInt(btn.dataset.col);

    let cell = gameboardObject.grid[row][col];
    if (cell === "hit") {
      btn.style.backgroundColor = "red";
    } else if (cell === "miss") {
      btn.style.backgroundColor = "blue";
    } else if (cell instanceof Ship && boardElement === ownBoard) {
      btn.style.backgroundColor = "green";
    } else {
      btn.style.backgroundColor = "grey";
    }
  });
}

//Rotate direction

const rotateBtn = document.getElementById("rotateButton");
const rotateText = document.getElementById("rotateText");

rotateBtn.addEventListener("click", () => {
  if (direction === "horizontal") {
    direction = "vertical";
    rotateText.innerText = "vertical";
  } else {
    direction = "horizontal";
    rotateText.innerText = "horizontal";
  }
});

//Setup and start button

const shipsHuman = [new Ship(5), new Ship(4), new Ship(3), new Ship(2)];
const shipsComputer = [new Ship(5), new Ship(4), new Ship(3), new Ship(2)];
const start = document.getElementById("startButton");
let currentShipIndex = 0;
let direction = "horizontal";
let gamePhase = "";

start.addEventListener("click", () => {
  gamePhase = "place";
  start.disabled = true;
  shipInfo.textContent = "You can now start placing your ships";
});

//Generate opposingBoard and attack listener

let humanTurn = true;
for (let row = 0; row < 10; row++) {
  for (let col = 0; col < 10; col++) {
    const btn = document.createElement("button");
    btn.dataset.row = row;
    btn.dataset.col = col;

    btn.addEventListener("click", () => {
      if (gamePhase !== "attack") return;
      if (!humanTurn) return;
      let row = parseInt(btn.dataset.row);
      let col = parseInt(btn.dataset.col);
      let result = human.attackClick(computer, row, col);

      if (result === "hit" || result === "miss") {
        opposingBoard
          .querySelectorAll("button")
          .forEach((btn) => (btn.disabled = true));

        humanTurn = false;
        lastAttackDiv.textContent = result;
        syncBoard(opposingBoard, computer.gameboard);

        if (computer.gameboard.allSunk()) {
          lastAttackDiv.textContent = "Game ended, you won";
          return;
        } else {
          computer.makeRandomAttack(human);
          syncBoard(ownBoard, human.gameboard);
          if (human.gameboard.allSunk()) {
            lastAttackDiv.textContent = "Game ended, you lost";
            return;
          }
          humanTurn = true;

          opposingBoard
            .querySelectorAll("button")
            .forEach((btn) => (btn.disabled = false));
        }
      } else if (result === null) {
        lastAttackDiv.textContent = "Invalid attack, try again";
        humanTurn = true;
      }
    });
    opposingBoard.appendChild(btn);
  }
}
