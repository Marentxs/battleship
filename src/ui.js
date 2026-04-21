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
        errorInfo.textContent = "Additional info";
        syncBoard(ownBoard, human.gameboard);
        currentShipIndex++;

        if (currentShipIndex === shipsHuman.length) {
          gamePhase = "attack";
          shipInfo.textContent =
            "All ships placed! Click opponent board to attack";

          ownBoard.querySelectorAll("button").forEach((btn) => {
            btn.disabled = true;
          });

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

    btn.className = "";

    if (cell === "hit") {
      btn.classList.add("hit");
    } else if (cell === "miss") {
      btn.classList.add("miss");
    } else if (cell instanceof Ship && boardElement === ownBoard) {
      btn.classList.add("ship");
    } else {
      btn.classList.add("empty");
    }
  });
}

//Rotate direction

const rotateBtn = document.getElementById("rotateButton");

rotateBtn.addEventListener("click", () => {
  if (gameActive === false) {
    resetGame();
  } else {
    if (direction === "horizontal") {
      direction = "vertical";
      rotateBtn.innerText = "vertical";
    } else {
      direction = "horizontal";
      rotateBtn.innerText = "horizontal";
    }
  }
});

//Setup and start button

const shipsHuman = [new Ship(5), new Ship(4), new Ship(3), new Ship(2)];
const shipsComputer = [new Ship(5), new Ship(4), new Ship(3), new Ship(2)];
const start = document.getElementById("startButton");
let currentShipIndex = 0;
let direction = "horizontal";
let gamePhase = "";
let gameActive = true;

start.addEventListener("click", () => {
  gamePhase = "place";
  start.disabled = true;
  gameActive = true;
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
        shipInfo.textContent = `Your last shot was a ${result}.`;
        errorInfo.textContent = "Additional info";
        syncBoard(opposingBoard, computer.gameboard);

        if (computer.gameboard.allSunk()) {
          shipInfo.textContent = "Game ended, you won";
          gameActive = false;
          rotateBtn.innerText = "restart";
          return;
        } else {
          computer.makeAttack(human);
          syncBoard(ownBoard, human.gameboard);
          if (human.gameboard.allSunk()) {
            shipInfo.textContent = "Game ended, you lost";
            gameActive = false;
            rotateBtn.innerText = "restart";
            return;
          }
          humanTurn = true;

          opposingBoard
            .querySelectorAll("button")
            .forEach((btn) => (btn.disabled = false));
        }
      } else if (result === null) {
        errorInfo.textContent = "Invalid attack, try again";
        humanTurn = true;
      }
    });
    opposingBoard.appendChild(btn);
  }
}

// reset functionality

function resetGame() {
  gamePhase = "place";
  humanTurn = true;
  currentShipIndex = 0;
  direction = "horizontal";
  gameActive = true;

  for (const ship of shipsHuman) {
    ship.reset();
  }

  for (const ship of shipsComputer) {
    ship.reset();
  }

  human.gameboard.clear();
  computer.gameboard.clear();

  start.disabled = true;
  shipInfo.textContent = "You can now start placing your ships";
  errorInfo.textContent = "Additional info";
  rotateBtn.innerText = "horizontal";

  ownBoard.querySelectorAll("button").forEach((btn) => (btn.disabled = false));

  opposingBoard
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));

  syncBoard(ownBoard, human.gameboard);
  syncBoard(opposingBoard, computer.gameboard);
}

// drag and drop functionality

let isDragging = false;
let cloneElement = null;

function startDrag(event, ship) {
  let length = ship.length;
  const originalShip = ship;
  isDragging = true;

  const clone = ship.cloneNode(true);
  cloneElement = clone;

  const rect = originalShip.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  Object.assign(clone.style, {
    position: "absolute",
    top: event.clientY - offsetY + "px",
    left: event.clientX - offsetX + "px",
    margin: "0",
    zIndex: "9999",
  });

  //stored for later
  clone.dataset.offsetX = offsetX;
  clone.dataset.offsetY = offsetY;

  document.body.appendChild(clone);
  e.preventDefault();
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
}

function onDrag(event) {
  if (!isDragging || !cloneElement) return;
  let clone = cloneElement;

  const offsetY = parseFloat(clone.dataset.offsetY);
  const offsetX = parseFloat(clone.dataset.offsetX);

  Object.assign(clone.style, {
    top: event.clientY - offsetY + "px",
    left: event.clientX - offsetX + "px",
  });
}

function stopDrag() {
  if (!isDragging) return;
  cloneElement.remove();

  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);

  isDragging = false;
  cloneElement = null;
}

function getGridCellFromMouse(event, boardElement, cellWidth, cellHeight) {
  const rect = boardElement.getBoundingClientRect();

  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  if (
    mouseX >= 0 &&
    mouseX < rect.width &&
    mouseY >= 0 &&
    mouseY < rect.height
  ) {
    const col = Math.floor(mouseX / cellWidth);
    const row = Math.floor(mouseY / cellHeight);
    return { row, col };
  } else {
    return null;
  }
}
