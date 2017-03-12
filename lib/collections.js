import { Index, MinimongoEngine } from 'meteor/easy:search';
//import { Index, MongoDBEngine } from 'meteor/easy:search';

MapDB = new Meteor.Collection('maps');
Markers = new Meteor.Collection('markers');
Notifications = new Meteor.Collection('notifications');
Invitations = new Meteor.Collection('invitations');
Flags = new Meteor.Collection('flags');

//image uploads
Images = new FilesCollection({
  collectionName: 'Images',
  storagePath: process.env.PWD + '/public/uploads/images',
  downloadRoute: '/public/uploads/images',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});



/*UsersIndex = new Index({
  collection: Meteor.users,
  fields: ['username', 'email'],
  allowedFields: ['username', 'email'],
  engine: new MinimongoEngine(),
});*/

MapDBIndex = new Index({
  collection: MapDB,
  fields: ['name', 'info', 'creator'],
  allowedFields: ['name', 'info', '_id', 'creator', 'protection', 'subCount'],
  engine: new MinimongoEngine({
    sort: () => { subCount: -1 },
  }),
});

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
  //Meteor.subscribe('invitations');
}

if (Meteor.isServer) {
  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });
}

//notifications

//Notifications.allow({
  //update: function
//});

