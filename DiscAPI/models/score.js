const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    courseName: {
        type: String,
        required: true
    },
    players: {
        type: Array,
        required: true
    },
    playerScores: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Score', scoreSchema);
