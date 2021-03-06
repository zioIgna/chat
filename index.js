var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){   // in pratica socket identifica il client che si è connesso (?)
    console.log('a user connected');
    var mess = 'Someone just connected...';
    socket.broadcast.emit('new connection', mess);
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
/*     socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    }); */
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});