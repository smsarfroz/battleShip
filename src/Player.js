import { Gameboard } from "./Gameboard.js";

class Player {
    constructor(name) {
        this.name = name;
        this.Gameboard = Gameboard();
    }
}

export { Player };