Meteor.methods({
	createInvite: function(id, userId, mapId, invitePath, mapPath, username){
		Invitations.insert({
			_id: id, 
			userId: userId, 
			username: username,
			mapId: mapId,
			invitePath: invitePath, 
			mapPath: mapPath, 
			accepted: false,
			acceptedBy: '', 
			createdAt: new Date() 
		});
	},
	updateInvite: function (id){
			Invitations.update({_id: id}, 
				{$set: {
					accepted: true, 
					acceptedById: Meteor.userId(),
					acceptedBy: Meteor.user().username,  
					acceptedOn: new Date()}
				});	

	},
	revokeInvite: function (id){
			Invitations.remove({_id: id});	

	},
});