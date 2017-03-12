import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
var _deps = new Tracker.Dependency;
//import './main.html';




//Account Config

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});


//find if the current user is the owner
function isOwner(id){
	if (Meteor.userId == id){
		return true;
	}else{
		return false;
	}
}




 Meteor.startup(function() {
  $(window).resize(function() {
    $('#map').css('height', window.innerHeight - 82 - 45);
  });
  $(window).resize(); // trigger resize event 
});



//registered helper
Template.registerHelper('session',function(input){
    return Session.get(input);
});

Template.registerHelper('equals', function (a, b) {
      return a === b;
});






