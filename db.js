const mongoose = require('mongoose');

module.exports = function () {
  const db = 'mongodb://localhost/game';
  mongoose.connect(db)
  console.log("connceted")
}