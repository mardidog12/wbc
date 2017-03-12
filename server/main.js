import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

// Listen to incoming HTTP requests, can only be used on the server
WebApp.connectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});

// marker collection
//var Markers = new Meteor.Collection('markers');
Meteor.publish("markers", function () {
  return Markers.find();
});

// map collection
//var MapDB = new Meteor.Collection('maps');
Meteor.publish("maps", function () {
  return MapDB.find();
});

//Publish users
Meteor.publish("users", function () {
  return Meteor.users.find();
});

//publish notifications
Meteor.publish('notifications', function() {
  return Notifications.find();
});

Meteor.publish('invitations', function() {
  return Invitations.find();
});

Meteor.publish('flags', function() {
  return Flags.find();
});

