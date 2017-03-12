createMarkerNotification = function(marker) {
  //var marker = Marker.findOne(marker._id);
  var map = MapDB.findOne(marker.map_id);
  var user = Meteor.users.findOne(marker.user_id);
  var mapOwner = Meteor.users.findOne(map.user_id);
  if (map.user_id !== marker.userId) {
    Notifications.insert({
      notType: 'marker',
      userId: marker.user_id,
      markerId: marker._id,
      mapId: map._id,
      mapName: map.name,
      mapOwner: map.user_id,
      markerAuthor: user.username,
      mapURL: '/map/' + mapOwner.username + '/' + mapId,
      date: new Date()
    });
  }else{
    //console.log('your own page')
  }
};

createMarkerCommentNotification = function(id, objectInsertId, username, mapId, type) {
  //var marker = Marker.findOne(marker._id);
  var map = MapDB.findOne(mapId);
  var marker = Markers.findOne(id);
  var mapOwner = Meteor.users.findOne(map.user_id);
  if (map.user_id !== Meteor.userId() || marker.user_id !== Meteor.userId()) {
    Notifications.insert({
      notType: type,
      objectInsertId: objectInsertId,
      userId: Meteor.userId(),
      markerId: id,
      mapId: map._id,
      mapName: map.name,
      markerTitle: marker.title,
      markerOwner: marker.user_id,
      mapOwner: map.user_id,
      commentAuthor: username,
      mapURL: '/map/' + mapOwner.username + '/' + mapId,
      date: new Date()
    });
  }else{
    //console.log('your own page')
  }
};

removeMarkerNotification = function(id) {
  var notificationId = Notifications.findOne({objectInsertId: id})._id;
  if(notificationId){
   Notifications.remove({_id: notificationId}); 
  }
  

};

createInviteNotification = function(id, userId, mapId) {
  var map = MapDB.findOne(mapId);
  var user = Meteor.users.findOne(userId);
  var mapOwner = Meteor.users.findOne(map.user_id);
    Notifications.insert({
      notType: 'invite',
      userId: userId,
      mapId: mapId,
      mapName: map.name,
      mapOwner: map.user_id,
      markerAuthor: user.username,
      mapURL: '/map/' + mapOwner.username + '/' + mapId,
      date: new Date()
    });

};

createMapCommentNotification = function(commentId, username, mapId, type) {
  var map = MapDB.findOne(mapId);
  var userId = Meteor.userId();
  var mapOwner = Meteor.users.findOne(map.user_id);
  //if (map.user_id !== Meteor.userId()){

    //}
    Notifications.insert({
      notType: type,
      userId: userId,
      mapId: mapId,
      mapName: map.name,
      mapOwner: map.user_id,
      commentAuthor: username,
      mapURL: '/map/' + mapOwner.username + '/' + mapId,
      date: new Date()
    });

};

createFlagNotification = function(flagId, mediumId, flagCount, username, mapId, type) {
  var map = MapDB.findOne(mapId);
  var mapOwner = Meteor.users.findOne(map.user_id);
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
    Notifications.insert({
      notType: type,
      userId: Meteor.userId(),
      flagId: flagId,
      mediumId: mediumId,
      mediumType: flagType,
      flagCount: flagCount,
      mapId: mapId,
      mapName: map.name,
      mapOwner: map.user_id,
      markerAuthor: username,
      mapURL: '/map/' + mapOwner.username + '/' + mapId,
      date: new Date()
    });

};