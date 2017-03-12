
Template.map.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('markers');
		self.subscribe('images');
	})
});

//Meteor.subscribe('markers');
//Meteor.subscribe('images');

//sidebar helper
function isHidden(){
    	var hidden;
    	if (hidden != 'hidden'){
    		hidden = 'hidden';
    	}else{
    		hidden = '';
    	}
      return hidden;

}

//find marker info
function markerInfo(id){

	var marker = Markers.find({_id: id}).fetch();
	//Session.set({
	//	_id: marker[0]['_id'],
	//	owner: marker[0]['owner']
	//});


}

	function removeMarkerById(id){
	    Markers.remove({_id: id});
	}




Template.sidebar.helpers({
	markerInfo(){
		var id = Session.get('id');
		markers = Markers.find({_id: id}).fetch();
		return markers;
	},
	author(){
		var user_id = markers[0]['user_id'];

		var query = Meteor.users.find({_id: user_id}).fetch();

		return query;
	},
	city(){
		if (Session.get('newMarkerType') == 'city'){
			return true;
		}else{
			return false;
		}
	},
	place(){
		if (Session.get('newMarkerType') == 'place'){
			return true;
		}else{
			return false;
		}
	},
	culture(){
		if (Session.get('newMarkerType') == 'culture'){
			return true;
		}else{
			return false;
		}
	},
	event(){
		if (Session.get('newMarkerType') == 'event'){
			return true;
		}else{
			return false;
		}
	},
	war(){
		if (Session.get('newMarkerType') == 'war'){
			return true;
		}else{
			return false;
		}
	},
	sidebarTab(){

		return (Session.get('sidebarTab'));
	}
});

function currentAuthor(){
		let id = Session.get('id');
		let markers = Markers.find({_id: id}).fetch();
		let user_id = markers[0]['user_id'];


		//let query = Meteor.users.find({_id: user_id}).fetch();
		if(user_id == Meteor.userId()){

			return true;
		}else{

			return false;
		}
}

Template.editDeleteMarkers.helpers({
isAuthor(){
		return currentAuthor;
		},

});

Template.editDeleteMarkers.events({
	'click .delete'(event){	
		if(currentAuthor()){
			event.preventDefault();
			const id = Session.get('id');
			Markers.remove({_id: id});
						var sidebar = L.control.sidebar('sidebar');
			sidebar.close();
		}

	},
	'click .edit'(event){	
		if(currentAuthor()){
			event.preventDefault();
			var sidebar = L.control.sidebar('sidebar');
			sidebar.open('editMarker');

		}

	},	
});

//Add marker form
Template.sidebar.events({ 
	'submit .addMarker'(event){
		event.preventDefault();
		const target = event.target;
		const title = target.title.value;
		const info = target.info.value;
		const type = target.type.value;
		const startDate = target.startDate.value;
		const endDate = target.endDate.value;
		const imgId = Session.get('uploadedImage');
		
		var marker = {title: title, info: info, type: type, startDate: startDate, endDate: endDate, imgId: imgId, createdAt: new Date(), latlng: Session.get('latlng'), map_id: Session.get('map_id'), user_id: Meteor.userId()};
		
		Markers.insert(marker);
		createMarkerNotification(marker);
		target.title.value = '';
		target.info.value = '';
		target.type.value = 'select an option';
		target.startDate.value = '';
		target.endDate.value = '';
			var sidebar = L.control.sidebar('sidebar');
			sidebar.close();

	},
		'submit .editMarker'(event){
		event.preventDefault();
		const target = event.target;
		const title = target.title.value;
		const info = target.info.value;
		const type = target.type.value;
		const startDate = target.startDate.value;
		const endDate = target.endDate.value;
		Markers.update({_id: Session.get('id')}, {$set: {title: title, info: info, type: type, startDate: startDate, endDate: endDate, updatedAt: new Date()}});
		target.title.value = '';
		target.info.value = '';
		target.type.value = 'select an option';
		target.startDate.value = '';
		target.endDate.value = '';
		var sidebar = L.control.sidebar('sidebar');
		sidebar.open('markerInfo');

	},
	"change #type": function(event){
    	var selectValue = $(event.target).val();
    	Session.set({newMarkerType: selectValue});
    	console.log(Session.get('newMarkerType'))
    }
});

Template.map.created = function(){
mapCreator = FlowRouter.getParam('username');
mapId = FlowRouter.getParam('_id');
queryMap = MapDB.find({_id: mapId});
currentMap = queryMap.fetch();

queryMarkers = Markers.find({map_id: mapId});

	function isCustomMap(){
		if(currentMap[0]['custom'] === 1){
			var mapPath = mapCreator + '/' + mapId;
		}else{
			var mapPath = 'free/' + currentMap[0]['mapPath'];
		}
		return mapPath;
	}

mapPath = isCustomMap();

mapOwner = Roles.userIsInRole( Meteor.userId(), [mapId], 'owner' );
postingUser = Roles.userIsInRole( Meteor.userId(), [mapId], 'postingUser' );
	
if(Roles.userIsInRole( Meteor.userId(), [mapId], 'owner' )){
	Session.set({mapOwner: true});
}else{
	Session.set({mapOwner: false});
}
if(Roles.userIsInRole( Meteor.userId(), [mapId], 'registeredUser' ) || Roles.userIsInRole( Meteor.userId(), [mapId], 'owner' )){
	Session.set({registeredUser: true});
}else{
	Session.set({registeredUser: false});
}



}

	//mapPathVariable



Template.map.helpers({
	currentMap(){
		return MapDB.find({_id: FlowRouter.getParam('_id')}).fetch();
	},
	mapOwner(){
		return Session.get('mapOwner');
	},
	registeredUser(){
		var protection = currentMap[0]['protection'];
		if(protection != 'private'){
			return true;
		}else{
			return Session.get('registeredUser');
		}
		
	}



});


Template.map.rendered = function() {

function userPosts(){
	if(!currentMap[0]['userPosts']){
		if(mapOwner){
			return true;
		}else if(postingUser){
			return true;
		}else{
			return false
		}
	}else{
		return true;
	}

}








	//Icons
 	L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';

 	//city
 	var cityIcon = L.icon({
	    iconUrl: '/icons/city.png',

	    iconSize:     [32, 37], // size of the icon
	    iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
	    popupAnchor:  [-3, -46] // point from which the popup should open relative to the iconAnchor
	});
 	var cultureIcon = L.icon({
	    iconUrl: '/icons/culture.png',

	    iconSize:     [32, 37], // size of the icon
	    iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
	    popupAnchor:  [-3, -46] // point from which the popup should open relative to the iconAnchor
	});
 	var eventIcon = L.icon({
	    iconUrl: '/icons/event.png',

	    iconSize:     [32, 37], // size of the icon
	    iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
	    popupAnchor:  [-3, -46] // point from which the popup should open relative to the iconAnchor
	});
 	var placeIcon = L.icon({
	    iconUrl: '/icons/place.png',

	    iconSize:     [32, 37], // size of the icon
	    iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
	    popupAnchor:  [-3, -46] // point from which the popup should open relative to the iconAnchor
	});
 	var warIcon = L.icon({
	    iconUrl: '/icons/war.png',

	    iconSize:     [32, 37], // size of the icon
	    iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
	    popupAnchor:  [-3, -46] // point from which the popup should open relative to the iconAnchor
	});

	var map = L.map('map', {
		doubleClickZoom: false
	}).setView([0, 0], 2);


	  //render map
	L.tileLayer('/tiles/' + mapPath + '/{z}/{x}/{y}.png', {
	    minZoom: 1,
	    maxZoom: 3,
	    noWrap: true,
	    tms: true
	}).addTo(map);

		//remove marker
	function removeMarker(marker, id){
		map.removeLayer(marker);
	    Markers.remove({_id: id});
	}


	  //sidebar
	var sidebar = L.control.sidebar('sidebar');
	sidebar.addTo(map);

	//clicking actions

	if(Meteor.userId() || userPosts()){
		var newEventMarker;
	  	map.on('dblclick', function(event) {
	  		map.setView([event.latlng.lat + -20, event.latlng.lng + -50]);
	  	  	isHidden();
			sidebar.open('addMarker');
			Session.set({sidebarTab: 'addMarker'});
			
			if(typeof(newEventMarker)=='undefined'){
				newEventMarker = L.marker(event.latlng);
				newEventMarker.addTo(map);
			}else{
				newEventMarker.setLatLng(event.latlng);
			}
			Session.set({latlng: event.latlng, map_id: mapId});
	    	//Markers.insert({latlng: event.latlng, map_id: mapOwner, user_id: Meteor.userId()});
	  	});
	}else{
	  	map.on('dblclick', function(event) {
	  		mustLogIn();

	  	});

	}

	map.on('click', function(event) {
		isHidden();
	    if(sidebar.open()){
	   		sidebar.close();
	    }else{
	    }

	});


	
	queryMarkers.observe({
	    added: function (document) {
	    	let iconType;
	    	if(document.type){
			 	var varIcon = L.icon({
				    iconUrl: '/icons/'+document.type+'.png',

				    iconSize:     [32, 37], // size of the icon
				    iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
				    popupAnchor:  [-3, -46] // point from which the popup should open relative to the iconAnchor
				});
	    	}
	      var marker = L.marker(document.latlng, {icon: varIcon}).addTo(map)
	        .on('click', function(event) {

	        			map.setView([event.latlng.lat + -20, event.latlng.lng + -50]);
	        			var id = document._id;
	        			Session.set({id: id});
	        			//markerInfo(id);
	        			sidebar.open('markerInfo');
	        			Session.set({sidebarTab: 'markerInfo'});
	        			//removeMarker(marker, id);


	        });
	    },
	    changed: function (newDocument, oldDocument) {
	    	if(oldDocument.type != newDocument.type){
	    		var varIcon = L.icon({
				    iconUrl: '/icons/'+newDocument.type+'.png',

				    iconSize:     [32, 37], // size of the icon
				    iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
				    popupAnchor:  [-3, -46] // point from which the popup should open relative to the iconAnchor
				});
	    	}

	      var marker = L.marker(oldDocument.latlng, {icon: varIcon});
	      map.removeLayer(marker);
	      var marker = L.marker(newDocument.latlng, {icon: varIcon});
	      marker.addTo(map);

	    },
	    removed: function (oldDocument) {
	      layers = map._layers;
	      var key, val;
	      for (key in layers) {
	        val = layers[key];
	        if (val._latlng) {
	          if (val._latlng.lat === oldDocument.latlng.lat && val._latlng.lng === oldDocument.latlng.lng) {
	            map.removeLayer(val);
	          }
	        }
	      }
	    }
	  });
};