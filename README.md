# Button Game - Vincit pre-assignment

## Game info

The game is a simple multiplayer game, where players click a button. Every time a player clicks the button they lose a point and increase the overall counter. Clicking the button can reward the player with points.

The player wins:
- 5 points every 10th click
- 40 points every 100th click
- 250 points every 250th click

## Implementation

Backend is Node and Express, client communicates with the server using Socket.Io. Frontend is React. Player score is stored in LocalStorage. The counter for all the button clicks is updated to mongoDB.

App is live at https://vincit-btngame.herokuapp.com/

## Install & Run

1. Download Node https://nodejs.org/en/ and mongoDB https://www.mongodb.com/
2. Clone the repository 
```
git clone https://github.com/anttipessa/vincit-btngame.git
```
3. Install backend
```
npm install
```
4. Install frontend
```
cd frontend
npm install
```
5. Database and socket config
- Insert one field to the Score database
- In the server.js file change the const id to the one in your database
- In the Btn.js file in \frontend\src\components change ENDPOINT variable to 'localhost:3000'

6. Run the app
- Start server from the root dir with ` node server `
- Start client from frontend dir with ` npm start `
- App is now running at http://localhost:3001/

## Assignment (in finnish)

https://koodarijahti.fi/Ennakkotehtava_2020_Painikepeli.pdf
