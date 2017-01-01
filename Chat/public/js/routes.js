//routes
var AppRouter = Backbone.Router.extend({
	routes: {
		"*actions": "chat"
	},
	
	chat: function () {
		//object of collection
		this.messages = new MessageCollection();
		//object of chat view model
		this.chat = new ChatView({ collection: this.messages, el:'#container' });
		this.chat.render();
	}
});

//created object of routes
var app = new AppRouter();
Backbone.history.start();
