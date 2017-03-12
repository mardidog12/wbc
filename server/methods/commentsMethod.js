Meteor.methods({
	createComment: function(id, commentId, username, comment){
		var date = new Date();
		var userId = Meteor.userId();
		//var username = Meteor.user().username;
		var commentArray = {'_id': commentId, 'userId': userId, 'username': username, 'comment': comment,  'added': date};
		//var comment = Markers.find({_id: mapId, 'subscribers._id': userId}, {limit: 1}).count() > 0;
		if(Meteor.userId()){
			Markers.update({_id: id}, 
				{$push: {
					comments: commentArray,
					}
				});	
		}else{
			alert('Please Log In to Comment');
		}
	},
	updateComment: function (id, commentId, comment){
		var userId = Markers.findOne({commentId: commentId}).comments.userId;
		if(Meteor.userId() == userId){
			Markers.update({_id: id, "comments._id": commentId}, 
				{
					$set: {
					'comments.$.comment': comment, 
					'comments.$.updated': new Date()
					}
				});	
		}

	},
	deleteComment: function (id, markerId){
		var userId = Markers.findOne({commentId: commentId}).comments.userId;		
		if(Meteor.userId() == userId){
			Markers.update({_id: mapId}, 
				{$pull: {
					'comments': {'_id': markerId},
					}
				});	
		}else{
			console.log('not commentOwner');
		}	

	},
		createMapComment: function(id, commentId, username, comment){
		var date = new Date();
		var userId = Meteor.userId();
		//var username = Meteor.user().username;
		var commentArray = {'_id': commentId, 'userId': userId, 'username': username, 'comment': comment,  'added': date};
		//var comment = Markers.find({_id: mapId, 'subscribers._id': userId}, {limit: 1}).count() > 0;
		if(Meteor.userId()){
			MapDB.update({_id: id}, 
				{$push: {
					comments: commentArray,
					},
				$inc: {commentCount: 1}
				});	
		}else{
			alert('Please Log In to Comment');
		}
	},
	updateMapComment: function (id, commentId, comment){
		var userId = MapDB.findOne({commentId: commentId}).comments.userId;
		if(Meteor.userId() == userId){
			MapDB.update({_id: id, "comments._id": commentId}, 
				{
					$set: {
					'comments.$.comment': comment, 
					'comments.$.updated': new Date()
					},
				$inc: {commentCount: 1}
				});	
		}

	},
	deleteMapComment: function (id, markerId){
		var userId = MapDB.findOne({commentId: commentId}).comments.userId;		
		if(Meteor.userId() == userId){
			MapDB.update({_id: mapId}, 
				{$pull: {
					'comments': {'_id': markerId},
					},
				$inc: {subCount: -1}
				});	
		}else{
			console.log('not commentOwner');
		}	

	},
});