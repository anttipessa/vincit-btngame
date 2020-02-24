const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const scoreSchema = new Schema({
    points: Number
})

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;