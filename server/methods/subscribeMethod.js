Meteor.methods({
	subscribe: function (mapId, userId){
		var date = new Date();
		var userArray = {'_id': userId, 'added': date};
		var subscribed = MapDB.find({_id: mapId, 'subscribers._id': userId}, {limit: 1}).count() > 0;
		if(!subscribed){
			MapDB.update({_id: mapId}, 
				{$push: {
					subscribers: userArray,
					},
				$inc: {subCount: 1}
				});	
		}else{
			console.log('already subscribed');
		}
	
	}, 
	unsubscribe: function (mapId, userId){
		var date = new Date();
		var userArray = {'_id': userId, 'added': date};
		var subscribed = MapDB.find({_id: mapId, 'subscribers._id': userId}, {limit: 1}).count() > 0;
		if(subscribed){
			MapDB.update({_id: mapId}, 
				{$pull: {
					'subscribers': {'_id': userId},
					},
				$inc: {subCount: -1}
				});	
		}else{
			console.log('not subscribed');
		}
	
	}, 

	isSubscribed: function(mapId, userId){
		var subscribed = MapDB.find({_id: mapId, 'subscribers._id': userId}, {limit: 1}).count() > 0;
		if(subscribed){
			return true;
		}else{
			return false;
		}
	},

});