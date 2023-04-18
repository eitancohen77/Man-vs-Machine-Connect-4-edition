const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    gameID: Number,
    winner: Number,
    game:[{
        plays: Number,
        position: Number
    }]
});

module.exports = mongoose.model('Player', playerSchema);