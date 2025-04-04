import { Player } from "./Player.js";
function DOM() {
    let player1 = new Player("sarfroz");
    let player2 = new Player("computer");
    
    const humanBoard = document.querySelector(".humanBoard");
    const computerBoard = document.querySelector(".computerBoard");

    const makeGrid = (boardElement) => {
        const row = 10;
        const column = 10;
        for (let i = 0; i < row; ++i) {
            const rowdiv = document.createElement("div");
            rowdiv.classList.add("row");
            boardElement.appendChild(rowdiv);

            for (let j = 0; j < column; ++j) {
                const celldiv = document.createElement("div");
                celldiv.classList.add("cell");
                rowdiv.appendChild(celldiv);
            }
        }
    };
    makeGrid(humanBoard);
    makeGrid(computerBoard);
    return { player1, player2 };
}
export { DOM };