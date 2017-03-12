Template.notifications.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe('notifications');
    self.subscribe('markers');
    self.subscribe('maps');
  })
});


Template.notifications.helpers({
  notifications: function() {
  	var map = MapDB.find({'subscribers._id': Meteor.userId()});
    var mapOwner = MapDB.find({user_id: Meteor.userId()});
    var marker = Markers.find({user_id: Meteor.userId()});
  	var fullNot = [];
  	map.forEach(function(item){
  		var notifications = Notifications.find({mapId: item._id, userId: {$not: Meteor.userId()}, readBy: {$not: Meteor.userId()}});
      notifications.forEach(function(doc){
    		if(doc.notType == 'marker' || doc.notType == 'invite' || doc.notType == 'mapComment'){
          fullNot.push(doc); 
        }else{

        }
      });
  	});
    mapOwner.forEach(function(item){
      var notifications = Notifications.find({mapId: item._id, userId: {$not: Meteor.userId()}, readBy: {$not: Meteor.userId()}});
      notifications.forEach(function(doc){
        if(doc.notType == 'flag'){
          fullNot.push(doc); 
        }else{

        }
      });
    });
    marker.forEach(function(item){
      var notifications = Notifications.find({markerId: item._id, userId: {$not: Meteor.userId()}, readBy: {$not: Meteor.userId()}});
      notifications.forEach(function(doc){
        if(doc.notType == 'markerComment' || doc.notType == 'markerLike'){
          fullNot.push(doc); 
        }else{

        }
      });
    });
    return fullNot;
  },
  notificationCount: function(){

    var map = MapDB.find({'subscribers._id': Meteor.userId()});
    var mapOwner = MapDB.find({user_id: Meteor.userId()});
    var marker = Markers.find({user_id: Meteor.userId()});
    var notCount = 0;
    map.forEach(function(item){
      var notifications = Notifications.find({mapId: item._id, userId: {$not: Meteor.userId()}, readBy: {$not: Meteor.userId()}});
      notifications.forEach(function(doc){
        if(doc.notType == 'marker' || doc.notType == 'invite'  || doc.notType == 'mapComment'){
          notCount++; 
        }else{

        }
      });
    });
    mapOwner.forEach(function(item){
      var notifications = Notifications.find({mapId: item._id, userId: {$not: Meteor.userId()}, readBy: {$not: Meteor.userId()}});
      notifications.forEach(function(doc){
        if(doc.notType == 'flag'){
          notCount++; 
        }else{

        }
      });
    });
    marker.forEach(function(item){
      var notifications = Notifications.find({markerId: item._id, userId: {$not: Meteor.userId()}, readBy: {$not: Meteor.userId()}});
      notifications.forEach(function(doc){
        if(doc.notType == 'markerComment' || doc.notType == 'markerLike'){
          notCount++; 
        }else{

        }
      });
    });
    return notCount;
  },
});

Template.notification.helpers({
  notificationMapPath: function() {
    
  },
  isType:function(notType){
       return this.notType == notType;
    }
})

Template.notification.events({
  'click a': function() {
    Notifications.update(this._id, {$push: {readBy: Meteor.userId()}});
  }
})