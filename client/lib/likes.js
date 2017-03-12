Template.likeTemplate.helpers({
	markers(){
		return Markers.findOne({_id: Session.get('id')});
	},
	likes(){
		
		const likes = Markers.findOne({_id: Session.get('id')}).likes;
		if(likes){
			return likes;
		}else{
			return '';
		}
		
	},
	isLike(){
		const id = Session.get('id');
		const isLike = Markers.findOne({_id: id, 'likes.userId': Meteor.userId()});
		return isLike;
	},
	likesCount(){
		const likes = Markers.findOne({_id: Session.get('id')}).likes.length;
		return likes;
	},	
});

Template.likeTemplate.events({
	'click .addLike'(event){
		event.preventDefault();
		
		if(Meteor.user()){
			const id = Session.get('id');
			const mapId = FlowRouter.getParam('_id');
			const isLike = Markers.findOne({_id: id, 'likes.userId': Meteor.userId()});
			if(!isLike){
				const likeId = Random.id();
				const username = Meteor.user().username;
				Meteor.call('createLike', id, likeId, username);
				createMarkerCommentNotification(id, likeId, username, mapId, 'markerLike');
			}else{
				//const likeId = isLike.likes._id;
				isLike.likes.map(function(i){
					if(i.userId == Meteor.userId()){
						var currentLikeId = i._id;
						removeMarkerNotification(currentLikeId);
						Meteor.call('removeLike', currentLikeId, id);
												
					}
					
				})

			}

		}else{
			alert('Please Log In');
		}
	}
})