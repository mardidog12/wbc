Meteor.methods({
	addRolesOfMap: function (userId, mapId, role){
			Roles.addUsersToRoles(userId, mapId, role);	
	}, 
	removeRoles: function (userId, mapId, role){
			Roles.removeUsersFromRoles(userId, mapId, role);	
	}, 

});