function Gameboard() {
    const rows = 10;
    const columns = 10;
    const board = [];
    const missedAttacks = [];
    const cell = () => {
        let value = '';
        let Ship = null;
        const getValue = () => {
            return value;
        };
        const placeStuff = (stuff) => {
            value = stuff;
        }
        const getShip = () => {
            return Ship;
        }
        const placeShipOnCell = (ship) => {
            Ship = ship;
        } 
    };
    for (let i = 0; i < row; ++i) {
        board[i] = [];
        for (let j = 0; j < column; ++j) {
            board[i].push(cell());
        }   
    }
    const placeShip = (row, column) => {
        board[row][column].placeShipOnCell();
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
                if (!ship.isSunk()) {
                    defeated = false;
                }
            });
        });
        return defeated; 
    };

}
export { Gameboard }; 

