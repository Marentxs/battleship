import { test, expect } from "@jest/globals";
import Ship from "./ship.js";
import Gameboard from "./gameboard.js";

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
