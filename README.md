# Battleship Game

🔗 Live Demo: https://marentxs.github.io/battleship/

A Battleship game built with vanilla JavaScript, with drag-and-drop ship placement and turn-based combat against a computer with intelligent attacks.

## Features

- **Drag-and-Drop Ship Placement** - Place your ships by dragging them onto the game board
- **Ship Rotation** - Toggle between horizontal and vertical orientation
- **Smart Computer AI** - Computer opponent that hunts strategically:
  - Random attacks when no targets found
  - Adjacent cell targeting after a hit
  - Line extension once ship orientation is determined
- **Visual Feedback** - Clear indicators for hits, misses, and ship placements
- **Real-Time Board Sync** - Both boards update instantly after each attack
- **Validation System** - Prevents invalid ship placements and out-of-bounds attacks

## Built With

- JavaScript (ES6+)
- HTML5 & CSS3
- Webpack (module bundler)
- Object-oriented programming (Ship, Player, Computer classes)

## How to Play

1. **Place Your Ships** - Drag each ship from the sidebar onto your grid
2. **Rotate if Needed** - Use the rotate button to switch ship orientation
3. **Start the Battle** - Click the opponent's grid to launch attacks
4. **Sink All Ships** - Hit all enemy ship cells before they sink yours
