const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    score: {
        type: Integer,
    }
})

const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;