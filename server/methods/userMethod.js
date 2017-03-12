Meteor.methods({
	findByUsername: function (username){
		
		var query =  Meteor.users.find({username: username});
		console.info(query.fetch())
		return query.fetch();

	}, 

});