import { Player } from "./Player.js";
import { Ship } from "./Ship.js";
import { Gameboard } from "./Gameboard.js";

test("test ship class", () => {
  const shipObject = new Ship(4);
  expect(shipObject.length).toBe(4);
  expect(shipObject.numberOfHits).toBe(0);
  expect(shipObject.hasSunk).toBe(false);

  shipObject.hit();
  expect(shipObject.numberOfHits).toBe(1);
  expect(shipObject.isSunk()).toBe(false);
});

test("test player object", () => {
  const myPlayer = new Player("sarfroz");
  expect(myPlayer.name).toBe("sarfroz");
});

describe("test Gameboard class", () => {
  let game = Gameboard();
  let ship = new Ship(3);
  let board = game.getBoard();
  game.placeShip(0, 0, 3);
  it("should contain a ship inside the cell", () => {
    expect(board[0][0].getShip()).toStrictEqual(ship);
  });
  let boardcell = board[0][0];
  boardcell.placeStuff('X');
  it("should contain the value that was assigned to the cell", () => {
    expect(boardcell.getValue()).toBe('X');
  });   

  let shipOnCell = boardcell.getShip();
  it("should have updated value of number of attacks", () => {
    game.receiveAttack(0,0);
    expect(shipOnCell.numberOfHits).toBe(1);
  });
  it("should have updated value of number of attacks as 2", () => {
    game.receiveAttack(1,0);
    expect(shipOnCell.numberOfHits).toBe(2);
  });
  it("should have updated value of number of attacks as 3", () => {
    game.receiveAttack(2,0);
    expect(shipOnCell.numberOfHits).toBe(3);
  });
  it("should contain a ship inside the cell", () => {
    expect(board[0][0].getShip()).toBe(shipOnCell);
  });
  it("should report that all ships are sunk", () => {
    expect(game.areAllShipsSunk()).toBe(true);
  });
});
