class Ship {
    constructor(length, numberOfHits, hasSunk) {
        this.length = length;
        this.numberOfHits = numberOfHits;
        this.hasSunk = hasSunk;
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