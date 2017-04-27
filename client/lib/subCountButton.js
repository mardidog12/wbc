Template.subCount.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('maps');
	})
});

//count the number of subscribers for each map

Template.subCount.events({
	'click .addSubs'(event){
		event.preventDefault();
		const maps = MapDB.find();
		maps.forEach(function(item){
			//var agg = MapDB.aggregate({
			//	$project: {_id: 'item._id', count: {$size: 'subscribers'}}
			//});
			var agg = item;
			console.info(agg);
		});
	}
});