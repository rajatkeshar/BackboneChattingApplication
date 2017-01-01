var express = require('express');
var app = express();

var messages = [];
var users = [];


//serve static files on the server
app.use(express.static(__dirname + '/public'));
var server = require('http').createServer(app);

//listning at port 8081
server.listen(8081, function() {
	console.log('listening at port 8081');
});

app.get('/',function(req,res){
	res.sendFile(__dirname + '/views/chat.html');
});

// Add Socket IO to your server
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

	socket.once('disconnect', function(data) {
		socket.disconnect();
	});

	socket.on('message', function (data) {
		console.log(data.user + ": " + data.message);
		io.sockets.emit('message', data);
		messages.push(data);
	});

	socket.emit('historyMessage', { oldMessages: messages });

	socket.on('newUser', function (data) {
		users.push(data);
		io.sockets.emit('newUser', users); 
	});

});

