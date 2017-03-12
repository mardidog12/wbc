Template.mapSettings.helpers({
	//const currentMap = MapDB.find({_id: FlowRouter.getParam('_id')}).fetch();
	//const iconStyle = currentMap['iconStyle'];
	currentMap(){
		return MapDB.find({_id: FlowRouter.getParam('_id')}).fetch();
	},
	mapOwner(){
		let isOwner = Roles.userIsInRole( Meteor.userId(), FlowRouter.getParam('_id'), 'owner' );
		return isOwner;
	},
	//iconStyles
	isIcon:function(iconStyle){
       return this.iconStyle == iconStyle;
    },	
    isProtection:function(protection){
       return this.protection == protection;
    },

});

Template.mapSettings.events({ 
	'submit .editMap'(event){
		event.preventDefault();
		const target = event.target;
		const name = target.name.value;
		const info = target.info.value;
		const userPosts = target.userPosts.checked;
		const iconStyle = target.iconStyle.value;
		const protection = target.protection.value;
		const userId = Meteor.userId();
		const id = FlowRouter.getParam('_id');
		const username = FlowRouter.getParam('username')
		Meteor.call('updateMaps', id, name, info, iconStyle, protection, userPosts, userId);
		Meteor.call('addRolesOfMap', userId, id, 'owner');
		const pathDef = '/map/:username/:map_id';
		const params = {username: username, map_id: id};
		const path = FlowRouter.path(pathDef, params);
		FlowRouter.redirect(path);
	}, 
});
