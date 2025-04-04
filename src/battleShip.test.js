import { Ship } from "./Ship";

test('test ship class', () => { 
    const shipObject = new Ship(4, 3, false);
    expect(shipObject.length).toBe(4);
    expect(shipObject.numberOfHits).toBe(3);
    expect(shipObject.hasSunk).toBe(false);

    shipObject.hit();
    expect(shipObject.numberOfHits).toBe(4);

    expect(shipObject.isSunk()).toBe(true);
});