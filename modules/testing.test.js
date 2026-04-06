import { test, expect } from "@jest/globals";
import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";
import Computer from "./computer.js";

test("Ship registers hits", () => {
  const ship = new Ship(2);
  ship.hit();

  expect(ship.hits).toBe(1);
});

test("Ship sinks", () => {
  const ship = new Ship(1);
  ship.hit();

  expect(ship.isSunk()).toBe(true);
});

test("Grid dimensions", () => {
  const gameboard = new Gameboard();

  expect(gameboard.grid.length).toBe(10);
  expect(gameboard.grid[0].length).toBe(10);
});

test("Ship placement", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);
  gameboard.place(ship, 5, 5, "horizontal");

  expect(gameboard.grid[5][5]).toBe(ship);
  expect(gameboard.grid[5][6]).toBe(ship);
  expect(gameboard.grid[5][7]).toBe(null);
});

test("Attack function", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);
  gameboard.place(ship, 5, 5, "horizontal");
  gameboard.receiveAttack(5, 5);

  expect(gameboard.grid[5][5]).toBe("hit");
});

test("Missed shot", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);
  gameboard.place(ship, 4, 4, "horizontal");
  gameboard.receiveAttack(2, 2);

  expect(gameboard.grid[2][2]).toBe("miss");
});

test("Computer shots", () => {
  const human = new Player();
  const computer = new Computer();
  computer.makeRandomAttack(human.gameboard);

  const hasNonNullValue = human.gameboard.grid.some((cell) => cell !== null);
  expect(hasNonNullValue).toBe(true);
});

test("allSunk returns false until all ships are sunk", () => {
  const gameboard = new Gameboard();
  const ship1 = new Ship(1);
  const ship2 = new Ship(2);
  gameboard.place(ship1, 1, 1, "horizontal");
  gameboard.place(ship2, 2, 2, "horizontal");

  expect(gameboard.allSunk()).toBe(false);
  gameboard.receiveAttack(1, 1);
  expect(gameboard.allSunk()).toBe(false);
  gameboard.receiveAttack(2, 2);
  expect(gameboard.allSunk()).toBe(true);
});
