const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');
app.use(cors());
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: 'http://localhost:19006',
        methods:['GET','POST']
    }
});

io.on('connection',(socket)=>{
    socket.on("join_room",(data)=>{
        socket.join(data);
    })
    socket.on('message', (data)=>{
        socket.to(data.room).emit('receiveMessage',data.message)
    })
})
server.listen(3001, ()=>{
    console.log('Express server listening on port 3001');
})
app.get('/',(req,res)=>{
    res.send('HI')
}) 