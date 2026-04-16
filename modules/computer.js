import Player from "./player.js";

class Computer extends Player {
  constructor() {
    super();
    this.currentTargetHits = [];
    this.nextAttacks = [];
    this.remainingShips = [5, 4, 3, 2];
  }

  makeRandomAttack(opponent) {
    let attacked = false;

    while (!attacked) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);

      if (opponent.gameboard.canAttack(row, col)) {
        attacked = true;
        let result = opponent.gameboard.receiveAttack(row, col);
        return { result, row, col };
      }
    }
  }

  makeAttack(opponent) {
    //Attack from nextAttacks arr
    if (this.nextAttacks.length > 0) {
      const target = this.nextAttacks.shift();

      if (opponent.gameboard.canAttack(target.row, target.col)) {
        const result = opponent.gameboard.receiveAttack(target.row, target.col);

        if (result === "hit") {
          this.currentTargetHits.push(target);
          return result;
        } else if (result === "miss") {
          return result;
        }
      }

      //Random attack
    } else if (this.currentTargetHits.length === 0) {
      const resultObject = this.makeRandomAttack(opponent);
      const { result, row, col } = resultObject;

      if (result === "hit") {
        this.currentTargetHits.push({ row, col });
      }

      return result;

      //Adjacent squares
    } else if (this.currentTargetHits.length === 1) {
      const base = this.currentTargetHits[0];
      const potentialAttacks = [
        { row: base.row + 1, col: base.col },
        { row: base.row - 1, col: base.col },
        { row: base.row, col: base.col + 1 },
        { row: base.row, col: base.col - 1 },
      ];

      const validAttacks = potentialAttacks.filter((attack) =>
        opponent.gameboard.canAttack(attack.row, attack.col),
      );
      if (validAttacks.length === 0) {
        this.currentTargetHits = [];
        return null;
      }

      const target = validAttacks.shift();

      this.nextAttacks.push(...validAttacks);
      const result = opponent.gameboard.receiveAttack(target.row, target.col);

      if (result === "hit") {
        this.currentTargetHits.push(target);
      }
      return result;

      //Extend line
    } else if (this.currentTargetHits.length >= 2) {
      const direction =
        this.currentTargetHits[0].col === this.currentTargetHits[1].col
          ? "vertical"
          : "horizontal";

      let target;
      let otherEnd;

      if (direction === "horizontal") {
        const sortedHits = [...this.currentTargetHits].sort(
          (a, b) => a.col - b.col,
        );
        const max = sortedHits[sortedHits.length - 1];
        const min = sortedHits[0];

        if (opponent.gameboard.canAttack(max.row, max.col + 1)) {
          target = { row: max.row, col: max.col + 1 };
          otherEnd = { row: min.row, col: min.col - 1 };
        } else if (opponent.gameboard.canAttack(min.row, min.col - 1)) {
          target = { row: min.row, col: min.col - 1 };
          otherEnd = { row: max.row, col: max.col + 1 };
        } else {
          this.currentTargetHits = [];
          return null;
        }
      }

      if (direction === "vertical") {
        const sortedHits = [...this.currentTargetHits].sort(
          (a, b) => a.row - b.row,
        );
        const max = sortedHits[sortedHits.length - 1];
        const min = sortedHits[0];

        if (opponent.gameboard.canAttack(max.row + 1, max.col)) {
          target = { row: max.row + 1, col: max.col };
          otherEnd = { row: min.row - 1, col: min.col };
        } else if (opponent.gameboard.canAttack(min.row - 1, min.col)) {
          target = { row: min.row - 1, col: min.col };
          otherEnd = { row: max.row + 1, col: max.col };
        } else {
          this.currentTargetHits = [];
          return null;
        }
      }

      const result = opponent.gameboard.receiveAttack(target.row, target.col);
      if (result === "hit") {
        this.currentTargetHits.push(target);
      } else if (result === "miss") {
        if (opponent.gameboard.canAttack(otherEnd.row, otherEnd.col)) {
          this.nextAttacks.push(otherEnd);
        }
      }
      return result;
    }
    return result;
  }

  placeRandom(ownShip) {
    let placed = false;

    while (!placed) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);

      const directions = ["horizontal", "vertical"];
      const direction = directions[Math.floor(Math.random() * 2)];

      if (this.gameboard.canPlace(ownShip, row, col, direction)) {
        placed = true;
        return this.gameboard.place(ownShip, row, col, direction);
      }
    }
  }
}

export default Computer;
