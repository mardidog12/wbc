
Template.mapCreation.events({ 
	'submit .newMap'(event){
		event.preventDefault();
		if(Meteor.user()){
			const target = event.target;
			const name = target.name.value;
			const info = target.info.value;
			const mapPath = target.mapPath.value;
			const iconStyle = target.iconStyle.value;
			const protection = target.protection.value;
			const userId = Meteor.userId();
			const id = Random.id();
			const creator = Meteor.users.findOne({_id: userId}).username;
			Meteor.call('createMap', id, name, info, mapPath, iconStyle, protection, userId, creator);
			Meteor.call('addRolesOfMap', userId, id, 'owner');
			Meteor.call('subscribe', id, userId);
			target.title.value = '';
			target.info.value = '';
			const pathDef = ':username/:map_id';
			const params = {username: Meteor.user().username, map_id: id};
			const path = FlowRouter.path(pathDef, params);
			FlowRouter.redirect(path);
		}else{
			alert('You must be signed in');
		}
	}, 
});