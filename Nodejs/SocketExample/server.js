const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', function(socket) {
    socket.on('message', function(message) {
        console.log("Receiving message");
        if (!socket.username) {
            socket.username = message;
            socket.broadcast.emit('joinedRoom', socket.username);
        } else {
            io.emit('serverMessage', socket.username + ' said: ' + message);
        }
    });
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(3000);

