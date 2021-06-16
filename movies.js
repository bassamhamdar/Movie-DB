const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    title: String,
    year: Number,
    rating: Number
});
module.exports = mongoose.model('Movie', movieSchema);