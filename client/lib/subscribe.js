Template.subscribe.events({
	'click .subscribe'(event){
		event.preventDefault();
		const userId = Meteor.userId();
		const subscribed = MapDB.find({_id: mapId, 'subscribers._id': userId}, {limit: 1}).count() > 0;
		if(!subscribed){
			Meteor.call('subscribe', mapId, userId);
			
		}
		
		
	},
		'click .unsubscribe'(event){
		event.preventDefault();
		const userId = Meteor.userId();
		const subscribed = MapDB.find({_id: mapId, 'subscribers._id': userId}, {limit: 1}).count() > 0;
		if(subscribed){
			Meteor.call('unsubscribe', mapId, userId);
			
		}
		
	},

});

Template.subscribe.helpers({
	subscribed(){
		let mapId = FlowRouter.getParam('_id');
		let userId = Meteor.userId();
		let subscribed = MapDB.find({_id: mapId, 'subscribers._id': userId}, {limit: 1}).count() > 0;
		return !subscribed;	
	},
})