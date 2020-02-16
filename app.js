const express = require('express');
const socket = require('socket.io');
const helmet = require("helmet");
const cookieParser = require('cookie-parser')

const app = express();
app.use(helmet());
app.use(cookieParser());

//require('./db')();

const server = app.listen(3000, () => {
    console.log('Server running at localhost:3000')
});
module.exports = server;

app.use(express.static('public'))



const io = socket(server)

let counter = 0;

io.on('connection', (socket) => {
    console.log('made connection', socket.id)
    socket.on('press', (data) => {
        counter = counter + 1;
         if (counter % 10==0) {
           let num = 5
           socket.emit('small', num)
         }
         else if (data.score == 0){
             socket.emit('restart')
         }
 

    })
})


