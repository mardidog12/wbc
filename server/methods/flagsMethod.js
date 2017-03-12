Meteor.methods({
	createFlag: function(flagId, issue, otherText, mediumId, flagCount){
		userId = Meteor.userId();
		if(MapDB.findOne({_id: mediumId})){
			var flagType = 'map';
		}else if(Markers.findOne({_id: mediumId})){
			var flagType = 'marker';
		}else if(Markers.findOne({'comments._id': mediumId})){
			var flagType = 'markerComment';
		}else if(MapDB.findOne({'comments._id': mediumId})){
			var flagType = 'mapComment';
		}else{
			var flagType = '';
		}
		var currentFlag = Flags.findOne({mediumId: mediumId, userId: userId});
		
		if(!currentFlag){
			Flags.insert({
				_id: flagId, 
				userId: userId, 
				issue: issue,
				otherText: otherText,
				mediumId: mediumId, 
				flagType: flagType,
				resolved: false,
				resolvedOn: '', 
				flagCount: flagCount,
				createdAt: new Date() 
			});			
		}else{
			console.log('You have already flagged this');
		}

	},
	updateFlag: function (id){
			Flags.update({_id: id}, 
				{$set: {
					accepted: true, 
					acceptedById: Meteor.userId(),
					acceptedBy: Meteor.user().username,  
					acceptedOn: new Date()}
				});	

	},
	removeFlag: function (id){
			Flags.remove({_id: id});	

	},
});