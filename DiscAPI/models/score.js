const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    courseName: {
        type: String,
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
        type: String,
        required: true
    }
});

module.exports = mongoose.model('score', scoreSchema);
