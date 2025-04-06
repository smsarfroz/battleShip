import { Player } from "./Player.js";
function DOM() {
  const updateBoardDisplay = (gameboard, playerNumber, isGameStarted) => {
    const board = gameboard.getBoard();
    const boardElement =
      playerNumber == 0
        ? document.querySelector(".humanBoard")
        : document.querySelector(".computerBoard");
    const rows = 10;
    const columns = 10;

    const shipLeft1 = document.querySelector(".shipLeft1");
    const shipLeft2 = document.querySelector(".shipLeft2");
    console.log(gameboard.getNumberOfShipsLeft());
    if (!playerNumber) {
      shipLeft2.textContent = gameboard.getNumberOfShipsLeft();
    } else {
      shipLeft1.textContent = gameboard.getNumberOfShipsLeft();
    }
    if (!isGameStarted) {
      for (let i = 0; i < rows; ++i) {
        const rowdiv = document.createElement("div");
        rowdiv.classList.add("row");
        boardElement.appendChild(rowdiv);

        for (let j = 0; j < columns; ++j) {
          const celldiv = document.createElement("div");
          const valOnCell = board[i][j].getValue();
          celldiv.classList.add("cell");
          celldiv.dataset.row = i;
          celldiv.dataset.column = j;
          celldiv.textContent = valOnCell;
          rowdiv.appendChild(celldiv);
        }
      }
    } else {
      for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < columns; ++j) {
          const valOnCell = board[i][j].getValue();
          const cell =
            playerNumber == 0
              ? document.querySelector(
                  `.computerBoard [data-row="${i}"][data-column="${j}"].cell`
                )
              : document.querySelector(
                  `.humanBoard [data-row="${i}"][data-column="${j}"].cell`
                );
          if (cell) {
            cell.textContent = valOnCell;
          } else {
            console.log("Cell not found.");
          }
        }
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

    updateBoardDisplay(gameboard1, 0, 0);
    updateBoardDisplay(gameboard2, 1, 0);

    return { player1, player2, gameboard1, gameboard2 };
  };
  // setupNewGame();

  const gameController = () => {
    let { player1, player2, gameboard1, gameboard2 } = setupNewGame();

    const players = [
      {
        name: player1,
        gameboard: gameboard1,
      },
      {
        name: player2,
        gameboard: gameboard2,
      },
    ];

    let idx = 0;
    let activePlayer = players[idx];

    const turnDiv = document.querySelector(".turn");
    turnDiv.textContent = `Your Turn`;

    const switchPlayerTurn = () => {
      activePlayer = activePlayer == players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => {
      return activePlayer;
    };

    const checkWin = () => {
      if (players[1-idx].gameboard.areAllShipsSunk()) {
        return true;
      } else {
        return false;
      }
    };

    const computerboard = document.querySelector(".computerBoard");

    computerboard.addEventListener("click", (event) => {
      const cellDiv = event.target;
      const row = cellDiv.dataset.row;
      const column = cellDiv.dataset.column;
      playRound(row, column, cellDiv);
    });

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const playRound = (row, column, cellDiv) => {
      idx = 0;
      players[1].gameboard.receiveAttack(row, column);
      updateBoardDisplay(players[1].gameboard, idx, 1);
      if (checkWin()) {
        prompt(`Congrats, You won the game`);
      } else {
        idx = 1;
        turnDiv.textContent = `Computer's Turn`;

        const computerMove = async () => {
          await delay(1000);
          let computerChoice = [0, 0];
          computerChoice[0] = getRandomInt(0, 9);
          computerChoice[1] = getRandomInt(0, 9);

          players[0].gameboard.receiveAttack(
            computerChoice[0],
            computerChoice[1]
          );
          updateBoardDisplay(players[0].gameboard, idx, 1);

          if (checkWin()) {
            prompt(`You lose, computer won the game.`);
          } else {
            turnDiv.textContent = `Your Turn`;
          }
        };

        computerMove();
      }
    };
    return { players, switchPlayerTurn, getActivePlayer, checkWin, playRound };
  };
  gameController();

  return { setupNewGame, updateBoardDisplay };
}
export { DOM };
