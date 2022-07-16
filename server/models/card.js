const mongoose = require('mongoose');
const Card = mongoose.Schema({
    front: String, back: String
}, { _id: false });
module.exports = Card;