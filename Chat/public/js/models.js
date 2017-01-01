// new user model
var ConnectionModel = Backbone.Model.extend({
	defaults: {
		'user': '', 
		'onlineUser': []
	},
	
	initialize: function () {
		_.bindAll(this, 'save');
		this.on("change", this.save);
		if (sessionStorage && sessionStorage.cnxdata){
			this.set(JSON.parse(sessionStorage.cnxdata));
		}
	},
	
	save: function () {
		if (sessionStorage) {
			sessionStorage.cnxdata = JSON.stringify(this.toJSON());
		}
	}
});

//message model
var MessageModel = Backbone.Model.extend({
	defaults: {
		'user': '',
		'message': '',
		'onlineUser': []
	}
});
