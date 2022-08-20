const mongoose = require('mongoose');
const Answer = require('./answer');
const Card = mongoose.Schema({
    question: String, 
    answers: [Answer], 
    confirmed: Boolean
}, { _id: false });
module.exports = Card;