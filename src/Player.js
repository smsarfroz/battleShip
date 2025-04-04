import { Gameboard } from "./Gameboard.js";

class Player {
    constructor(name) {
        this.name = name;
        this.Gameboard = new Gameboard;
    }
}

export { Player };