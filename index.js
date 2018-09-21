var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){   // in pratica socket identifica il client che si è connesso (?)
    console.log('a user connected');
    var mess = 'Someone just connected...';
    // il metodo socket.broadcast.emit è un po' come io.emit in quanto trasmette a tutti i client tranne che al client che ha emesso il segnale
    // cfr. https://socket.io/docs/emit-cheatsheet/
    socket.broadcast.emit('new connection', mess);
    // io.emit('new connection', mess);    // così il messaggio verrebbe inviato anche all'emittente originale
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
/*     socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    }); */
    socket.on('disconnect', function(){
        var mess = 'Someone just disconnected...';
        console.log('user disconnected');
        io.emit('disconnection', mess);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});