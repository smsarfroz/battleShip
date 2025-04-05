class Ship {
    constructor(length) {
        this.length = length;
        this.numberOfHits = 0;
        this.hasSunk = false;
    }
    hit() {
        if (this.numberOfHits < this.length) {
            this.numberOfHits++;
        }
    }
    isSunk() {
        if (this.numberOfHits === this.length) {
            this.hasSunk = true;
            return true;
        }
        return false;
    }
}

export { Ship }