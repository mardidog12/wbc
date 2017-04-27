Meteor.subscribe('maps');

//get a random number
function randomInRange(min, max) {
	var random = Math.floor(Math.random() * (max - min + 1)) + min;
	return random;
}


Template.featuredMaps.helpers({
	mainFeatured(){
		//set random number to shuffle main featured box
		var random = randomInRange(0, 2);


		//skip a the random number of documents and select one
		var featured = MapDB.find({featured: 1}, {limit:1, skip:random});
		Session.set({'mainFeatured': featured.fetch()[0]._id});
		return featured;
	},
	otherFeatured(){
		//find all except main featured
		var mainFeatured = Session.get('mainFeatured');
		return MapDB.find({featured: 1, _id:{$ne:mainFeatured}});

	},
});

Template.topMaps.helpers({
	active(){
		return MapDB.find({protection: 'public'}, {sort: {subCount: -1, markerCount: -1}, limit: 10})
	}
});