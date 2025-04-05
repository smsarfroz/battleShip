import { Player } from "./Player.js";
function DOM() {
 
  const updateBoardDisplay = (gameboard, playerNumber) => {
    const board = gameboard.getBoard();
    const boardElement =
      playerNumber == 1
        ? document.querySelector(".humanBoard")
        : document.querySelector(".computerBoard");
    const rows = 10;
    const columns = 10;
    for (let i = 0; i < rows; ++i) {
      const rowdiv = document.createElement("div");
      rowdiv.classList.add("row");
      boardElement.appendChild(rowdiv);

      for (let j = 0; j < columns; ++j) {
        const valOnCell = board[i][j].getValue();
        const celldiv = document.createElement("div");
        celldiv.classList.add("cell");
        celldiv.textContent = valOnCell;
        rowdiv.appendChild(celldiv);
      }
    }
  };

  const setupNewGame = () => {
    let player1 = new Player("sarfroz");
    let player2 = new Player("computer");
    let gameboard1 = player1.Gameboard;
    let gameboard2 = player2.Gameboard;
    //place ships randomly
    gameboard1.placeShip(0, 0, 4);
    gameboard1.placeShip(0, 2, 3);
    gameboard1.placeShip(0, 4, 2);

    gameboard2.placeShip(3, 0, 4);
    gameboard2.placeShip(3, 2, 3);
    gameboard2.placeShip(3, 4, 2);

    updateBoardDisplay(gameboard1, 1);
    updateBoardDisplay(gameboard2, 2);
  };
  setupNewGame();
  return { setupNewGame, updateBoardDisplay };
}
export { DOM };
