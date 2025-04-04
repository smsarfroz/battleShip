class Ship {
    constructor(length) {
        this.length = length;
        this.numberOfHits = 0;
        this.hasSunk = false;
    }
    hit() {
        this.numberOfHits++;
    }
    isSunk() {
        if (this.numberOfHits === this.length) {
            return true;
        }
        return false;
    }
}

export { Ship }