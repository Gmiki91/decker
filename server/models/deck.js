const mongoose = require('mongoose');
const Card = require('./card');
const Deck = mongoose.Schema({
    title: String, 
    description: String, 
    cards: [Card],
}, { collection: 'decks' });
module.exports = mongoose.model('Deck', Deck);