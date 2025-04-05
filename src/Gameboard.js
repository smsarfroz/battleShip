import { Ship } from "./Ship.js";
function Gameboard() {
    const rows = 10;
    const columns = 10;
    const board = [];
    const missedAttacks = [];
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
    const placeShip = (row, column, ship) => {
        //assuming ship is placed horizontally
        let shipLength = ship.length;
        board[row][column].placeShipOnCell(ship);
        board[row + 1][column].placeShipOnCell(ship);
        board[row + 2][column].placeShipOnCell(ship);
    };
    const receiveAttack = (row, column) => {
        let ship = board[row][column].getShip();
        if (ship == null) {
            board[row][column].placeStuff('.');
            missedAttacks.push([row, column]);
        } else {
            board[row][column].placeStuff('X');
            ship.hit();
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
    
    return { cell, getBoard, placeShip, receiveAttack, areAllShipsSunk};
}
export { Gameboard }; 

