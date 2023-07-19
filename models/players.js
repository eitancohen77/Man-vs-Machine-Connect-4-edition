const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    /* babyBot: [{
        gameID: Number,
        winner: Number,
        moves:[{
            plays: Number,
            position: Number
        }]
    }] 
    */

            username: {
                type: String,
                required: [true, 'Username cannot be blank']
            },
            password: {
                type: String,
                required: [true, 'Password cannot be blank']
            },
            stats: [{ 
                gameID: Number,
                winner: Number,
                moves:[{
                    plays: Number,
                    position: Number
                }]
            }]
            
});

module.exports = mongoose.model('Player', playerSchema);