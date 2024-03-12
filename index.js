const http = require("http");
const express = require('express');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket io

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on('chat message', (msg) => {
        console.log('message:' + msg);
        io.emit('chat message', msg);
    })
})


app.use(express.static(path.resolve("./public")));

app.get('/', (req, res) => {
    return res.sendFile('/public/index.html')
})



server.listen(9000, () => console.log(`Server Started at PORT: 9000`));

