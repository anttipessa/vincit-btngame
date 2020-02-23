const express = require('express');
const socket = require('socket.io');
const helmet = require("helmet");
const cookieParser = require('cookie-parser')
const debug = require('debug')('btn:app');
const path = require('path');

const app = express();
app.use(helmet());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log('Server running at localhost:3000')
});

module.exports = server;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

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


