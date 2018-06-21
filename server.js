var express = require('express');
var socket = require('socket.io')
var app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.get('/',function(req,res){
    res.render('index')
})

var server = app.listen(3000, function(){
    console.log('Running on Port: 3000')
});
var io = socket(server);

io.sockets.on('connection', function(socket){
    console.log('new client: ' + socket.id);

    socket.on('send-chat', function(data){
        console.log(`User ${socket.id} sent chat ${data}`)
        io.emit('rec-chat', socket.id + ': ' + data);
    })

    socket.on('mouse', function(data){
        socket.broadcast.emit('mouse', data)
    })

    socket.on('disconnect', function(){
        console.log('client: ' +socket.id + ' disconnected.')
    })
})