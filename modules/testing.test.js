import { test, expect } from "@jest/globals";
import Ship from "./ship.js";

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
