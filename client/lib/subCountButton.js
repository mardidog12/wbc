Template.subCount.events({
	'click .addSubs'(event){
		event.preventDefault();
		const maps = MapDB.find();
		maps.forEach(function(item){
			var agg = MapDB.aggregate({
				$project: {_id: 'item._id', count: {$size: 'subscribers'}}
			});
			console.info(agg);
		});
	}
});