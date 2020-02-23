# Button Game - Vincit pre-assignment

## Game info

The game is a simple multiplayer game, where players click a button. Every time a player clicks the button they lose a point and increase the overall counter. Clicking the button can reward the player with points.

The player wins:
- 5 points every 10th click
- 40 points every 100th click
- 250 points every 250th click


## Implementation

Backend is Node and Express, client communicates with the server using Socket.Io. Frontend is React. Player score is saved in LocalStorage.

App is live at https://vincit-btngame.herokuapp.com/

## Todo

- mongoDB for the counter
- code refactoring

## Install

1. Download Node https://nodejs.org/en/ 
2. Clone the repository
3. In the project folder run *npm install*
4. Then run *node app*
5. The app is now running at http://localhost:3000/

## Assignment (in finnish)

https://koodarijahti.fi/Ennakkotehtava_2020_Painikepeli.pdf
