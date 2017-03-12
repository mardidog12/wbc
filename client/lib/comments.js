Template.commentTemplate.helpers({
	markers(){
		return Markers.findOne({_id: Session.get('id')});
	},
	comments(){
		const comments = Markers.findOne({_id: Session.get('id')}).comments;
		if(comments){
			return comments;
		}else{
			return '';
		}
		
	}
});

Template.commentTemplate.events({
	'submit .addComment'(event){
		event.preventDefault();
		
		if(Meteor.user()){
			const target = event.target;
			const comment = target.comment.value;
			const username = Meteor.user().username;
			const commentId = Random.id();
			const id = Session.get('id');
			const mapId = FlowRouter.getParam('_id');
			Meteor.call('createComment', id, commentId, username, comment);
			target.comment.value = '';
			createMarkerCommentNotification(id, commentId, username, mapId, 'markerComment');
		}else{
			alert('Please Log In');
		}
	}
})

Template.mapCommentTemplate.helpers({
	markers(){
		return MapDB.findOne({_id: FlowRouter.getParam('_id')});
	},
	mapComments(){
		const comments = MapDB.findOne({_id: FlowRouter.getParam('_id')}).comments;
		if(comments){
			return comments;
		}else{
			return '';
		}
		
	}
});

Template.mapCommentTemplate.events({
	'submit .addComment'(event){
		event.preventDefault();
		
		if(Meteor.user()){
			const target = event.target;
			const comment = target.comment.value;
			const username = Meteor.user().username;
			const commentId = Random.id();
			const mapId = FlowRouter.getParam('_id');
			Meteor.call('createMapComment', mapId, commentId, username, comment);
			target.comment.value = '';
			createMapCommentNotification(commentId, username, mapId, 'mapComment');
		}else{
			alert('Please Log In');
		}
	}
})