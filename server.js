const express = require('express');
const socket = require('socket.io');
const helmet = require("helmet");
const mongoose = require('mongoose');
const path = require('path');
const Score = require('./models/scoreModel');

const app = express();
app.use(helmet());

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log('Server running at localhost:3000')
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/btn_game', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

const io = socket(server)

io.on('connection', (socket) => {
    console.log('made connection', socket.id)
    socket.on('press', async () => {
        
        // DB config
        const id = '5e53c920dccf4320ec853dc0'
        const score = await Score.findById(id)
        const counter = score.points + 1
        let nextwin;

        // Check for winner and emit it to client
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

        // Update score to DB
        const update = await Score.findByIdAndUpdate(id, {points : counter})
        await update.save()
    })
})


