# Battleship
<img width="1912" height="860" alt="battleShipScreenShot" src="https://github.com/user-attachments/assets/5a0676f4-1534-460e-9668-8a367e181d9a" />

The classic naval combat game implemented with Test-Driven Development (TDD). Sink all enemy ships before they sink yours!

## Features

- Full Battleship game with player vs computer
- Drag and drop ship placement
- Real-time game feedback
- Computer AI with smart targeting (hits adjacent squares after a hit)
- Turn-based gameplay
- Game over detection with winner announcement
- Clean, responsive UI

## Tech Stack

- JavaScript (ES6+)
- Jest for testing
- Webpack for bundling
- Babel for ESM/CJS conversion
- CSS for styling

## Game Rules

1. Each player places 5 ships on a 10x10 grid
2. Ships vary in length (Carrier: 5, Battleship: 4, Cruiser: 3, Submarine: 3, Destroyer: 2)
3. Players take turns attacking enemy coordinates
4. A hit is marked, misses are recorded
5. Sink all enemy ships to win!

## Getting Started

1. Clone the repo
2. Run `npm install`
3. Run `npm test` to run the test suite
4. Run `npm start` to start the development server
5. Run `npm run build` to build for production

## TDD Approach

This project was built using Test-Driven Development:

1. **Ship Class** - Tested hit() and isSunk() methods
2. **Gameboard Class** - Tested ship placement, receiveAttack(), missed attacks, and allSunk()
3. **Player Class** - Tested player creation and gameboard access
4. **Game Logic** - Tested turn management, computer AI, and win conditions

All business logic was fully tested before any DOM manipulation was added.

### Game
- Manages turns
- Handles computer AI
- Checks win conditions
- Controls game flow

## Computer AI

- Basic mode: Random attacks
- Smart mode (extra credit): After a hit, tries adjacent squares
- Never attacks the same coordinate twice

## Extra Credit Features

- Drag and drop ship placement
- Two-player mode with "pass device" screen
- Smart computer AI

## What I Learned

- Test-Driven Development methodology
- Writing unit tests with Jest
- Isolating business logic from DOM
- Event-driven programming
- AI algorithms for game opponents
- Drag and drop API
- Module pattern in JavaScript
- Babel configuration for ESM
- Game state management

---

Made with ❤️ as part of The Odin Project curriculum

Fonts used 

'Black Ops One' : ('https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/blackopsone/BlackOpsOne-Regular.ttf') 
