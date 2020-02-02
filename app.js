const express = require('express');
const socket = require('socket.io');
const helmet = require("helmet");
const cookieParser = require('cookie-parser')

const app = express();
app.use(helmet());
app.use(cookieParser());

require('./db')();

const server = app.listen(3000, () => {
    console.log('Server running at localhost:3000')
});
module.exports = server;
app.use(express.static('public'))



const io = socket(server)
let num = 20;
io.on('connection', (socket) => {
    console.log('made connection', socket.id)
    socket.on('press', (data) => {
        num = num - 1
        console.log(num, socket.id)
        if (num == 0) {
            socket.emit('restart')
            num = 20
        } else {
            socket.emit('points', num)
        }

    })
})


