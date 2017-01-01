//message collection
var MessageCollection = Backbone.Collection.extend({
	//message model
	model: MessageModel,
	initialize: function() {
		//object of connection model
		this.cnx = new ConnectionModel();
		_.bindAll(this, 'onlineUsers', 'historyMessage', 'connect', 'disconnect', 'send', 'receive'); 
		this.socket = io.connect();
		this.socket.on('connect', this.connect);
		this.socket.on('historyMessage', this.historyMessage);
		this.socket.once('disconnect', this.disconnect);
		this.socket.on('message', this.receive);
		this.socket.on('newUser', this.onlineUsers);
	},
	
	//fire event when new user clicked on login button
	newUser: function(users) {
		this.socket.emit('newUser', {
			onlineUser: users
		});
	},
	
	//set new logged-in user in connection model
	onlineUsers: function(data) { 
		this.cnx.set('onlineUser', data);
	},
	
	//fetch old messages
	historyMessage: function(data) {
		data.oldMessages.forEach(this.receive);
	},
	
	//on connect
	connect: function () {
		this.trigger('connect');
	},
	
	//on disconnect
	disconnect: function () {
		this.trigger('disconnect');
	},
	
	// add message to the collection (in message model) and display this on client
	receive: function (message) {
		this.add(message);
	},
	
	//send message to the server
	send: function (newMessage) {
		this.socket.emit('message', {
			user: this.cnx.get('user'),
			message: newMessage
		});
	}
});
