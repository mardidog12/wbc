Meteor.methods({
	createLike: function(id, likeId, username){
		var date = new Date();
		var userId = Meteor.userId();
		var likeArray = {'_id': likeId, 'userId': userId, 'username': username,  'added': date};
		if(Meteor.userId()){
			Markers.update({_id: id}, 
				{$push: {
					likes: likeArray,
					}
				});	
		}else{
			alert('Please Log In to Like');
		}
	},
	removeLike: function (id, markerId){
		var likes = Markers.findOne({'likes._id': id}).likes;
		likes.map(function(i){
			if(Meteor.userId() == i.userId){
				Markers.update({_id: markerId}, 
					{$pull: {
						'likes': {'_id': id},
						}
					});	
			}else{
			}		

		});	
		

	},
});