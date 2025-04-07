import { Player } from "./Player.js";
import { Ship } from "./Ship.js";
function DOM() {
  const updateBoardDisplay = (
    gameboard,
    playerNumber,
    isGameStarted,
    areWeReseting
  ) => {
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
    if (playerNumber == 0) {
      shipLeft2.textContent = `Enemy Ships left: ${gameboard.getNumberOfShipsLeft()}`;
    } else if (playerNumber == 1) {
      shipLeft1.textContent = `Ships remaining : ${gameboard.getNumberOfShipsLeft()}`;
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
          // celldiv.textContent = valOnCell;
          if (valOnCell == "[ship]") {
            celldiv.classList.add("ship");
          }
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
            if (valOnCell == "O") {
              if (areWeReseting) {
                board[i][j].placeStuff("");
              } else {
                cell.classList.add("miss");
              }
            } else if (valOnCell == "X") {
              if (areWeReseting) {
                board[i][j].placeStuff("");
              } else {
                cell.classList.add("hit");
              }
            } else if (valOnCell == '[ship]') {
              if (areWeReseting) {
                board[i][j].placeStuff("");
              } else {
                cell.classList.add('ship');
              }
            }
          } else {
            console.log("Cell not found.");
          }
        }
      }

      if (areWeReseting) {
        const allHitDivs = document.querySelectorAll(".hit");
        allHitDivs.forEach((element) => {
          element.classList.remove("hit");
        });

        const allMissDivs = document.querySelectorAll(".miss");
        allMissDivs.forEach((element) => {
          element.classList.remove("miss");
        });

      }
    }
  };
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const isValidCoord = (x, y) => {
    if (x >= 0 && x <= 9 && y >= 0 && y <= 9) {
      return true;
    }
    return false;
  }
  const randomize = (gameboard, coord, playerNumber) => {
    let board = gameboard.getBoard();

    gameboard.updateNumberOfShipsLeft(0);
    //remove ship class from cells of playerNumber's board
    if (playerNumber == 0) {
      const allShipDivsOfUser = document.querySelectorAll(".humanBoard .ship");
      allShipDivsOfUser.forEach(element => {
        element.classList.remove('ship');
      });
    } else {
      const allShipDivOfComputer = document.querySelectorAll(".computerBoard .ship");
      allShipDivOfComputer.forEach(element => {
        console.log(element);
        element.classList.remove('ship');
      });
    }
    for (let i = 0; i < 10; ++i) {
      for (let j = 0; j < 10; ++j) {
        board[i][j].placeShipOnCell(null);
        board[i][j].placeStuff('');
      }
    }
    let sumShouldBe = 0;
    coord.forEach((element) => {
      sumShouldBe += element[2];
    });
    let valid = false;
    let newCoords = [

    ];
    while (!valid) {
      let generatedCoord = [

      ];
      for (let i = 0; i < 4; ++i) {
        generatedCoord[i] = [];
        generatedCoord[i][0] = getRandomInt(0,9);
        generatedCoord[i][1] = getRandomInt(0,9);
        generatedCoord[i][2] = getRandomInt(1,4);
        generatedCoord[i][3] = getRandomInt(0,1);
      }
      //if there's a ship on a cell then value = 1 else 0
      let arrayFromgenCoord = [

      ];
      for (let i = 0; i < 10; ++i) {
        arrayFromgenCoord[i] = [];
      }
      let generatedCoordValid = true;
      generatedCoord.forEach(element => {
        const [x, y, len, dir] = element;
        if (dir == 0) {
          for (let i = 0; i < len; ++i) {
            if (isValidCoord(x + i, y)) {
              console.log(arrayFromgenCoord);
              arrayFromgenCoord[x + i][y] = 1;
            } else {
              generatedCoordValid = false; 
            }
          }
        } else {
          for (let i = 0; i < len; ++i) {
            if (isValidCoord(x, y + i)) {
              arrayFromgenCoord[x][y + i] = 1;
            } else {
              generatedCoordValid = false; 
            }
          }
        }
      });
      if (!generatedCoordValid) {
        continue;
      }

      let sumarrayFromgenCoord = 0;
      arrayFromgenCoord.forEach((element, idx) => {
        element.forEach((val, idx2) => {
          if (val == 1) {
            sumarrayFromgenCoord++;
          }
        });
      });
      if (sumarrayFromgenCoord == sumShouldBe) {
        valid = true;
        newCoords = generatedCoord;
      }
    }


    newCoords.forEach(element => {
      let [x, y, len, dir] = element;
      gameboard.placeShip(x, y, len, dir);
    });

    const Board = gameboard.getBoard();
    Board.forEach((row, idx1) => {
      row.forEach((cell, idx2) => {
        console.log(idx1, idx2, cell.getValue());
      });
    });
    updateBoardDisplay(gameboard, 1-playerNumber, 1, 0);
  };
  const setupNewGame = () => {
    let player1 = new Player("sarfroz");
    let player2 = new Player("computer");
    let gameboard1 = player1.Gameboard;
    let gameboard2 = player2.Gameboard;
    //place ships randomly
    const coords = [
      [0, 0, 3, 1],
      [3, 1, 2, 0],
      [7, 1, 1, 0],
      [2, 3, 1, 0],
    
    ];
    gameboard1.placeShip(0, 0, 3, 1);
    gameboard1.placeShip(3, 1, 2, 0);
    gameboard1.placeShip(7, 1, 1, 0);
    gameboard1.placeShip(2, 3, 1, 0);
    // gameboard1.placeShip(7, 3, 1, 0);
    // gameboard1.placeShip(2, 5, 3, 0);
    // gameboard1.placeShip(9, 5, 4, 1);
    // gameboard1.placeShip(0, 6, 1, 0);
    // gameboard1.placeShip(2, 7, 2, 0);
    // gameboard1.placeShip(5, 7, 2, 0);

    gameboard2.placeShip(0, 0, 3, 1);
    gameboard2.placeShip(3, 1, 2, 0);
    gameboard2.placeShip(7, 1, 1, 0);
    gameboard2.placeShip(2, 3, 1, 0);
    // gameboard2.placeShip(7, 3, 1, 0);
    // gameboard2.placeShip(2, 5, 3, 0);
    // gameboard2.placeShip(9, 5, 4, 1);
    // gameboard2.placeShip(0, 6, 1, 0);
    // gameboard2.placeShip(2, 7, 2, 0);
    // gameboard2.placeShip(5, 7, 2, 0);

    updateBoardDisplay(gameboard1, 0, 0, 0);
    updateBoardDisplay(gameboard2, 1, 0, 0);

    //randomize the board of computer 
    randomize(gameboard2, coords, 1);

    //add listener to randomize board1 option

    const randomizeSelection1 = document.querySelector(".randomizeSelection1");
    randomizeSelection1.addEventListener('click', () => {
      console.log("randomize button clicked");
      randomize(gameboard1, coords, 0);
    });
    return { player1, player2, gameboard1, gameboard2, coords };
  };
  // setupNewGame();

  const gameController = () => {
    let { player1, player2, gameboard1, gameboard2, coords } = setupNewGame();

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
      if (players[1 - idx].gameboard.areAllShipsSunk()) {
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
      if (!cellDiv.classList.contains('miss') && !cellDiv.classList.contains('hit')) {
        playRound(row, column, cellDiv);
      }
    });

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const playRound = (row, column, cellDiv) => {
      idx = 0;
      console.log("Before attack - Ships left:", players[1].gameboard.getNumberOfShipsLeft());
      players[1].gameboard.receiveAttack(row, column);
      console.log("After attack - Ships left:", players[1].gameboard.getNumberOfShipsLeft());
      updateBoardDisplay(players[1].gameboard, idx, 1);
      if (checkWin()) {
        //reset the board
        updateBoardDisplay(players[0].gameboard, 0, 1, 1);
        updateBoardDisplay(players[1].gameboard, 1, 1, 1);
        prompt(`Congrats, You won the game`);
        window.location.reload();
      } else {
        idx = 1;
        turnDiv.textContent = `Computer's Turn`;

        const computerMove = async () => {
          await delay(10);
          let computerChoice = [0, 0];
          computerChoice[0] = getRandomInt(0, 9);
          computerChoice[1] = getRandomInt(0, 9);
          while (!isValidCoord(computerChoice[0], computerChoice[1])) {
            computerChoice[0] = getRandomInt(0, 9);
            computerChoice[1] = getRandomInt(0, 9);
            //check if this location is free or not.
            const myboard = players[0].gameboard.getBoard();
            if (myboard[computerChoice[0]][computerChoice[1]].getValue == '') {
              break;
            } 
          }

          players[0].gameboard.receiveAttack(
            computerChoice[0],
            computerChoice[1]
          );
          updateBoardDisplay(players[0].gameboard, idx, 1);

          if (checkWin()) {
            //reset the board
            updateBoardDisplay(players[0].gameboard, 0, 1, 1);
            updateBoardDisplay(players[1].gameboard, 1, 1, 1);
            prompt(`You lose, computer won the game.`);
            window.location.reload();
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
