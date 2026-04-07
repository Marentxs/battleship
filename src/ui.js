import Ship from "../modules/ship.js";
import Player from "../modules/player.js";
import Computer from "../modules/computer.js";
import "./styles.css";

const ownBoard = document.getElementById("ownBoard");
const opposingBoard = document.getElementById("oppossingBoard");

for (let row = 0; row < 10; row++) {
  for (let col = 0; col < 10; col++) {
    const btn = document.createElement("button");
    btn.dataset.row = row;
    btn.dataset.col = col;
    ownBoard.appendChild(btn);
  }
}

let humanTurn = true;
for (let row = 0; row < 10; row++) {
  for (let col = 0; col < 10; col++) {
    const btn = document.createElement("button");
    btn.dataset.row = row;
    btn.dataset.col = col;

    btn.addEventListener("click", () => {
      if (!humanTurn) return;
      let result = human.attackClick(computer, row, col);

      if (result === "hit" || result === "miss") {
        opposingBoard
          .querySelectorAll("button")
          .forEach((btn) => (btn.disabled = true));

        humanTurn = false;
        lastAttackDiv.textContent = result;
        btn.style.backgroundColor = "red";

        if (computer.gameboard.allSunk()) {
          lastAttackDiv.textContent = "Game ended, you won";
          return;
        } else {
          computer.makeRandomAttack(human);
          if (human.gameboard.allSunk()) {
            lastAttackDiv.textContent = "Game ended, you lost";
            return;
          }

          opposingBoard
            .querySelectorAll("button")
            .forEach((btn) => (btn.disabled = false));
        }
      } else if (result === null) {
        lastAttackDiv.textContent = "Invalid attack, try again";
        humanTurn = true;
      }
      humanTurn = true;
    });
    opposingBoard.appendChild(btn);
  }
}
