import { Ship } from "./Ship.js";
function Gameboard() {
    const rows = 10;
    const columns = 10;
    const board = [];
    const missedAttacks = [];
    let numberOfShipsLeft = 0;
    const getBoard = () => {
        return board;
    }
    const cell = () => {
        let value = '';
        let Ship = null;
        const getValue = () => {
            return value;
        };
        const placeStuff = (stuff) => {
            value = stuff;
        };
        const getShip = () => {
            return Ship;
        };
        const placeShipOnCell = (ship) => {
            Ship = ship;
        };
        
        return { getValue, placeStuff, getShip, placeShipOnCell};
    };
    for (let i = 0; i < rows; ++i) {
        board[i] = [];
        for (let j = 0; j < columns; ++j) {
            board[i].push(cell());
        }   
    }
    const placeShip = (row, column, lengthOfShip) => {
        //assuming ship is placed horizontally
        //assuming the locations where it is being placed are valid
        numberOfShipsLeft++;
        let ship = new Ship(lengthOfShip);
        for (let i = 0; i < lengthOfShip; ++i) {
            board[row + i][column].placeShipOnCell(ship);
            board[row + i][column].placeStuff('[ship]');
        }
    };
    const receiveAttack = (row, column) => {
        let ship = board[row][column].getShip();
        if (ship == null) {
            board[row][column].placeStuff('O');
            missedAttacks.push([row, column]);
        } else {
            board[row][column].placeStuff('X');
            ship.hit();
            if (ship.isSunk()) {
                numberOfShipsLeft--;
            }
        }
    };
    const areAllShipsSunk = () => {
        let defeated = true; 
        board.forEach((row, index1) => {
            row.forEach((Cell, index2) => {
                let ship = Cell.getShip();
                if (ship) {
                    if (!ship.isSunk()) {
                        defeated = false;
                    }
                } else {
                    // console.log("No ship object found in this cell.");
                }
            });
        });
        return defeated; 
    };
    
    return { cell, getBoard, placeShip, receiveAttack, areAllShipsSunk, numberOfShipsLeft};
}
export { Gameboard }; 

