import { Player } from "./Player.js";
import { Ship } from "./Ship.js";
import { Gameboard } from "./Gameboard.js";

test('test ship class', () => { 
    const shipObject = new Ship(4);
    expect(shipObject.length).toBe(4);
    expect(shipObject.numberOfHits).toBe(0);
    expect(shipObject.hasSunk).toBe(false);

    shipObject.hit();
    expect(shipObject.numberOfHits).toBe(1);

    expect(shipObject.isSunk()).toBe(false);
});

test('test player object', () => { 
    const myPlayer = new Player("sarfroz");
    expect(myPlayer.name).toBe("sarfroz");
})

test('test Gameboard class', () => { 
    let game = new Gameboard();
    let ship = new Ship(3);
    let board = game.getBoard();
    console.log(board[0]);
    game.placeShip(0, 0, ship);
    expect(board[0][0].getShip()).toBe(ship);
});