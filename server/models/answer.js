const mongoose = require('mongoose');
const Answer = mongoose.Schema({
    text: String, 
    confirmed: Boolean
}, { _id: false });
module.exports = Answer;
