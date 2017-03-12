Meteor.methods({
	updateMaps: function (id, name, info, iconStyle, protection, userPosts, userId){
			MapDB.update({_id: id}, 
				{$set: {
					name: name, 
					info: info, 
					iconStyle: iconStyle, 
					protection: protection, 
					userPosts: userPosts, 
					updatedAt: new Date()}
				});	

	}, 
	createMap: function(id, name, info, mapPath, iconStyle, protection, userId, creator){
		MapDB.insert({
			_id: id, 
			name: name, 
			info: info, 
			mapPath: mapPath, 
			iconStyle: iconStyle,
			userPosts: true,
			protection: protection, 
			createdAt: new Date(), 
			user_id: userId,
			creator: creator
		});
	}

});