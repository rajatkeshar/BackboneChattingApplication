//chat view
var ChatView = Backbone.View.extend({
	chatTemplate: Handlebars.compile( $('#chat').html() ),
	nameTemplate: Handlebars.compile( $('#chat-name').html() ),
	events: {
		"click #connect": 'newUser',
		"click #send": 'send',
		'keypress': 'onKeypress'
	},
	
	initialize: function () {
		_.bindAll(this, 'newUser', 'send', 'render');
		this.collection.cnx.on('change', this.render);
		this.collection.on('add', this.render);
		this.collection.on('connect', this.connect);
		this.collection.on('disconnect', this.disconnect);
	},
	
	//get user name when login and send to the collection
	newUser: function () {
		var val = $('#user-name').val();
		if (val) {
			var self = this;
			this.collection.cnx.set("user", val);
			this.collection.newUser( val );
		}
	},
	
	//get message from the input box and send to the collection 
	send: function () {
		var msg =  $('#new-message').val();
		if(msg) {
			this.collection.send( msg );       
		}
	},
	
	//on press enter send message 
	onKeypress: function(e){
		if (e.which == 13 || event.keyCode == 13){
			this.send();
		}
	},
	
	//rendering template on html
	render: function () {
		if (this.collection.cnx.get('user')) {
			this.$el.html(this.chatTemplate({onlineUsers: this.collection.cnx.get('onlineUser'), user: this.collection.cnx.get('user'), messages: this.collection.toJSON() }));
		} else {
			this.$el.html(this.nameTemplate());
		}
		return this;
	}
});
