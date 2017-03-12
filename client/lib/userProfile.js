Meteor.subscribe('users');

Template.userProfileCards.helpers({
maps: function() {
	const username = FlowRouter.getParam('username');
	const query = Meteor.users.find({username: username}).fetch();
	const userId = query[0]['_id'];
	return MapDB.find({user_id: userId});
},
userProfile(){
	return FlowRouter.getParam('username');
}

});

Template.subscribedWorlds.helpers({
subscriptions: function() {
	const username = FlowRouter.getParam('username');
	const query = Meteor.users.find({username: username}).fetch();
	const userId = query[0]['_id'];
	return MapDB.find({'subscribers._id': userId}, {limit: 5});
},
userProfile(){
	return FlowRouter.getParam('username');
}

});

Template.latestStories.helpers({
stories: function() {
	const username = FlowRouter.getParam('username');
	const query = Meteor.users.find({username: username}).fetch();
	const userId = query[0]['_id'];
	return Markers.find({'user_id': userId}, {limit: 5});
},
userProfile(){
	return FlowRouter.getParam('username');
}

});