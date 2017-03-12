//routing

/*Router.configure({
  layoutTemplate: 'ApplicationLayout'
});*/

Meteor.subscribe('maps');

//route home

FlowRouter.route('/', {
  action: function(params) {
    BlazeLayout.render("ApplicationLayout", {navbar: "navbar", main: 'homepage'});
  }
 
});

FlowRouter.route('/uploads/images/:image', {
  action: function(params) {
    BlazeLayout.render("ApplicationLayout", {navbar: "navbar", main:  'imageView'});
  }
 
});

//route map

var mapRoutes = FlowRouter.group({
  prefix: '/map',
  name: 'map',
  triggersEnter: [function() {
  }]
});

mapRoutes.route('/create', {
  action: function(params) {
    BlazeLayout.render("ApplicationLayout", {navbar: "navbar", main: 'mapCreation'});
  }
});

/*mapRoutes.route('/:username', {

  triggersEnter: [ function() { 
    //return Meteor.users.findOne({username: params['username']});
  }], 
  action: function(params, queryParams) {
    Tracker.autorun(function(){
      let qUser = Meteor.users.findOne({username: params['username']});
      if(qUser){
        BlazeLayout.render("MapLayout", {navbar: "navbar", sidebar: "sidebar", main: "map"});
        }else{
      BlazeLayout.render("MapLayout", {navbar: "navbar", sidebar: "sidebar", main: "noUser"});
      }
    });
  },
});*/


mapRoutes.route('/:username/:_id', {

  triggersEnter: [ function() { 
    //return Meteor.users.findOne({username: params['username']});
  }], 
  action: function(params, queryParams) {
    Tracker.autorun(function(){
      let qUser = Meteor.users.find({username: params['username']});
      if(qUser){
        let q_id = MapDB.findOne({_id: params['_id']});
          if(q_id){
            BlazeLayout.render("MapLayout", {navbar: "navbar", sidebar: "sidebar", main: "map"});
          }else{
            BlazeLayout.render("MapLayout", {navbar: "navbar", sidebar: "sidebar", main: "noUser"});
          }
        
        }else{
      BlazeLayout.render("MapLayout", {navbar: "navbar", sidebar: "sidebar", main: "noUser"});
      }
    });
  },
});

mapRoutes.route('/:username/:_id/settings', {
  action: function(params) {
    Tracker.autorun(function(){
      let isOwner = Roles.userIsInRole( Meteor.userId(), params['_id'], 'owner' );
      if(isOwner){
        BlazeLayout.render("ApplicationLayout", {navbar: "navbar", main: 'mapSettings'});
    }else{
      BlazeLayout.render("MapLayout", {navbar: "navbar", sidebar: "sidebar", main: "notAuthorized"});
    }
    });
  }
});

//route profile
AccountsTemplates.configure({
    defaultLayout: 'ProfileLayout',
    defaultLayoutRegions: {
        nav: 'navbar'
    },
    defaultContentRegion: 'main'
});

AccountsTemplates.configureRoute('signIn', {
  layoutType: 'blaze',
  name: 'signin',
  path: '/login',
  layoutTemplate: 'ProfileLayout',
  layoutRegions: {
        nav: 'navbar'
    },
   contentRegion: 'main',  
  redirect: function(){
    if(Meteor.user()){
      FlowRouter.redirect(history.back())
    }
  },
});

var userRoutes = FlowRouter.group({
  prefix: '/user',
  name: 'user',
  triggersEnter: [function() {
  }]
});

userRoutes.route('/:username', {

  triggersEnter: [ function() { 
    //return Meteor.users.findOne({username: params['username']});
  }], 
  action: function(params, queryParams) {
    Tracker.autorun(function(){
      let qUser = Meteor.users.find({username: params['username']});
      if(qUser){
        BlazeLayout.render("ProfileLayout", {navbar: "navbar", main: "user"});
        }else{
      BlazeLayout.render("ProfileLayout", {navbar: "navbar", main: "noUser"});
      }
    });
  },
  
});

var inviteRoutes = FlowRouter.group({
  prefix: '/invite',
  name: 'invite',
  triggersEnter: [function() {
  }]
});

inviteRoutes.route('/:_id', {

  triggersEnter: [ function() { 
    //return Meteor.users.findOne({username: params['username']});
  }], 
  action: function(params, queryParams) {
    BlazeLayout.render("ApplicationLayout", {navbar: "navbar", main: 'invitationsAccept'});
  },
  
});


//Map Creation





FlowRouter.notFound = {
    // Subscriptions registered here don't have Fast Render support.
    subscriptions: function() {

    },
    action: function() {
      BlazeLayout.render("ApplicationLayout", {navbar: "navbar", main: "404"});
    }
};

//iron-routing

/*Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

//route home

Router.route('/', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('sidebar', {
    to:"sidebar"
  });
  this.render('homepage', {
    to:"main"
  });  
});

//route map
Router.route('/map/:username', function () {
  this.render('navbar', {
    to:"navbar"
  });
    this.render('sidebar', {
    to:"sidebar"
  });

var qUser = Meteor.users.findOne({username:this.params.username});
  if (qUser){
    this.render('map', {
      to:"main",
      data: function(){
        username: this.params.username;
        return Meteor.users.findOne({username:this.params.username});
      }
    });  
  }else{
    this.render('noUser', {
      to:"main"
  });
  
  } 
});

//route profile

Router.route('/user/:username', function () {
  this.render('navbar', {
    to:"navbar"
  });
  var qUser = Meteor.users.findOne({username:this.params.username});
  if (!qUser){
    this.render('noUser', {
      to:"main"
  });
  }else{
    this.render('user', {
      to:"main",
      data: function(){
        return Meteor.users.findOne({username:this.params.username});
      }
    });   
  }
  
});*/