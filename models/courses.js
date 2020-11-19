const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    id: String,
    name: String,
    area: String,
    city: String,
    x: String,
    y: String,
    Pars: Array,
});

module.exports = mongoose.model('Course', courseSchema);
