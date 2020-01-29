const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000, () => {
    console.log('Server running at localhost:3000')
});

app.use(express.static('public'))

const io = socket(server)
let num = 0;
io.on('connection', (socket) => {
    console.log('made connection', socket.id)
    socket.on('press', (data) => {
        num = num + 1
        console.log(num)
    })
})


