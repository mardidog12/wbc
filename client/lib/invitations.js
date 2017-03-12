Meteor.subscribe('invitations');

Template.invitationsTemplate.events({ 
	'click .generateInvite'(event){
		event.preventDefault();
		const target = event.target;
		const inviteKey = Random.id();
		const userId = Meteor.userId();
		const username = Meteor.user().username;
		const mapId = FlowRouter.getParam('_id');
		const invitePath = 'invite/' + inviteKey;
		const mapPath = 'map/' + username + '/' + mapId;
		Meteor.call('createInvite', inviteKey, userId, mapId, invitePath, mapPath, username);
		alert('New Invite Created. Send this link to your invitee:' + Meteor.absoluteUrl() + invitePath);	
	},
	'submit .revoke'(event){
		event.preventDefault();
		const target = event.target;
		const id = target.id.value;
		const invite = Invitations.findOne({_id:id});
		//const invite = Invitations.find({})
		const userId = invite.acceptedById;
		//const username = Meteor.user().username;
		const mapId = invite.mapId;
		//const invitePath = 'invite/' + inviteKey;
		//const mapPath = 'map/' + username + '/' + mapId;
		Meteor.call('removeRoles', userId, mapId, 'registeredUser');
		Meteor.call('revokeInvite', id);
		alert('User Removed');	
	}, 	 
});

Template.invitationsTemplate.helpers({
	invites(){
		return Invitations.find({mapId: FlowRouter.getParam('_id')});
	},
	rootURL(){
		return Meteor.absoluteUrl();
	}
});

//Invite Link
Template.invitationsAccept.events({ 
	'click .btn-accept'(event){
		event.preventDefault();
		const id = FlowRouter.getParam('_id');
		const invite = Invitations.findOne({_id: id});
		const userId = Meteor.userId();
		const mapId = invite.mapId;
		Meteor.call('updateInvite', id);
		Meteor.call('addRolesOfMap', userId, mapId, 'registeredUser');
		createInviteNotification(id, userId, mapId);
		const pathDef = '/map/:username/:map_id';
		const params = {username: invite.username, map_id: mapId};
		const path = FlowRouter.path(pathDef, params);
		FlowRouter.redirect(path);
	}, 
});

Template.invitationsAccept.helpers({
	invitee(){
		const invite = Invitations.findOne({_id: FlowRouter.getParam('_id')});
		return invite.username;
	},
	accepted(){
		const invite = Invitations.findOne({_id: FlowRouter.getParam('_id')});
		return invite.accepted;
	}
})