const express = require('express');
const socket = require('socket.io');
const helmet = require("helmet");
const cookieParser = require('cookie-parser')
const debug = require('debug')('btn:app');

const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(express.static('public'))

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log('Server running at localhost:3000')
});
module.exports = server;

const io = socket(server)

let counter = 0;
let nextwin;

io.on('connection', (socket) => {
    console.log('made connection', socket.id)
    socket.on('press', (data) => {
        counter = counter + 1;
        if (counter % 500 == 0) {
            socket.emit('big', 250)
        } else if (counter % 100 == 0) {
            socket.emit('medium', 40)
        } else if (counter % 10 == 0) {
            socket.emit('small', 5)
        } else {
            nextwin = counter % 10 - 10;
            socket.emit('no win', nextwin);
        }
        console.log(counter)
    })
})


