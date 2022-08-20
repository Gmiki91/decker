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
        origins: ['http://localhost:19006', 'http://localhost:42000'],
        methods: ['GET', 'POST']
    }
});
//deckTitle, roomNr
const roomList = new Map();
//roomNr, socketId
const userList = new Map();
io.on('connection', (socket) => {
    socket.on("join_deck", (deckTitle) => {
        socket.join(deckTitle);
        const list = roomList[deckTitle] === undefined ? [] : [...roomList[deckTitle]]
        io.to(socket.id).emit("room_list", list);

    })
    //data = {deckTitle, roomNr}
    socket.on("create_room", (data) => {
        socket.join(data.roomNr);
        socket.join(data.deckTitle);
        if (roomList[data.deckTitle] === undefined) { // 0 room in this deck
            roomList[data.deckTitle] = [data.roomNr];
        } else {
            roomList[data.deckTitle].push(data.roomNr);  // >=1 room in this deck
        }
        userList[data.roomNr] = [socket.id];
        io.in(data.deckTitle).emit("room_list", [roomList[data.deckTitle]]);
        io.to(socket.id).emit("user_list", [socket.id]); // lobby has only the creator in it at this point
    })

    socket.on("join_room", (roomNr) => {
        socket.join(roomNr);
        userList[roomNr].push(socket.id);
        io.in(roomNr).emit("user_list", [userList[roomNr]]);
    })

    // data = {deckTitle, roomNr}
    socket.on("delete_room", (data) => {
        if(roomList[data.deckTitle]){
        const index = roomList[data.deckTitle].indexOf(data.roomNr);
        roomList[data.deckTitle].splice(index, 1);
        io.in(data.deckTitle).emit("room_list", [roomList[data.deckTitle]]);
        }
    })


})
server.listen(3001, () => {
    console.log('Express server listening on port 3001');
})
app.use(express.json({ limit: '50kb' }));
app.post('/decks', catchAsync(async (req, res) => {
    const { title, description, cards } = req.body;
    const deck = await Deck.create({
        title,
        description,
        cards
    });
    deck.save();
    res.json('Success')
}))

app.get('/decks', catchAsync(async (req, res) => {
    const decks = await Deck.find();
    res.status(201).json({
        status: 'success',
        data: decks
    })
}))

app.get('/decks/:id', catchAsync(async (req, res) => {
    const deck = await Deck.findById(req.params.id);
    res.status(201).json({
        status: 'success',
        data: deck
    })
}))

mongoose.connect(
    `mongodb+srv://miki:Le6XaRgdlK6Fuk4F@cluster0.hakyf.mongodb.net/deck_game?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database!");
    });