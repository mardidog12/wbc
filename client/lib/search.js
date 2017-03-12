Template.search.helpers({
  //searchIndexes: () => [MapDBIndex], // instanceof EasySearch.Index
  mapDBIndex: () => MapDBIndex,
  //UsersIndex: () => UsersIndex,
  inputAttributes: function () {
		return { 'class': 'easy-search-input pull-right', 'placeholder': 'Search...' };
	},
	isProtection:function(protection){
       return this.protection == protection;
    },
});



  //let cursor = MapDBIndex.search('another') // search all docs that contain "search" in the name or score field

  //console.log(cursor.fetch()) // log found documents with default search limit
  //console.log(cursor.count()) // log count of all found documents
