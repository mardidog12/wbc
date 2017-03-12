Template.map.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('flags');
		self.subscribe('maps');
		self.subscribe('markers');
	})
});

Template.flagsTemplate.helpers({
	disabled(){
		if(Session.get('flagVal') == 'other'){
			console.info('false');
			return 'disabled';

		}
		else{
			console.info('true');
			return '';
		}
	}

});

Template.flagsTemplate.events({

	"change .radiobtn" (event){
    	var selectValue = $(event.target).val();
    	if(selectValue == 'other'){
    		document.getElementById("other").removeAttribute("disabled");	
    	}else{
    		document.getElementById("other").setAttribute("disabled", "disabled");
    	}
    	
    }, 
	'submit .flag'(event){
		event.preventDefault();
		
		if(Meteor.user()){
			const target = event.target;
			var selectValue = $(event.target).val();
			const issue = target.optradio.value;
				const otherText = target.other.value;
			const flagId = Random.id();
			const mediumId = target.flagType.value;
			const username = Meteor.user().username;
			const mapId = FlowRouter.getParam('_id');
			const flagCount = Flags.find({mediumId: mediumId}).count() + 1;
			Meteor.call('createFlag', flagId, issue, otherText, mediumId, flagCount);
			createFlagNotification(flagId, mediumId, flagCount, username, mapId, 'flag');
			$('.dropdown.open .dropdown-toggle').dropdown('toggle');
		}else{
			alert('Please Log In');
		}
	}
});