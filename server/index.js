const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const Deck = require('./models/deck');
const catchAsync = require('./catchAsync');
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:19006',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data);
    })
    socket.on('message', (data) => {
        socket.to(data.room).emit('receiveMessage', data.message)
    })
})
server.listen(3001, () => {
    console.log('Express server listening on port 3001');
})
app.use(express.json({ limit: '50kb' }));
app.post('/decks', catchAsync(async (req, res) => {
    const {title, description} = req.body;
    const deck = await Deck.create({
        title,
        description
    });
    deck.save();
    res.json('Success')
}))

app.get('/decks', catchAsync(async (req,res)=>{
    const decks = await Deck.find();
    res.status(201).json({
        status: 'success',
        data:decks
    })
}))

mongoose.connect(
    `mongodb+srv://user:pw@cluster0.hakyf.mongodb.net/deck_game?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database!");
    });