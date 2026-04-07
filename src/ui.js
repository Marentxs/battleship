import Ship from "../modules/Ship.js";
import Player from "../modules/Player.js";
import Computer from "../modules/Computer.js";
import { createElement } from "react";

const grid = document.getElementById("grid");

for (let row = 0; row < 10; row++) {
  for (let col = 0; col < 10; col++) {
    const btn = createElement("button");
    btn.dataset.row = row;
    btn.dataset.col = col;
    grid.appendChild(btn);
  }
}
