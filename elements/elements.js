//Global element manipulation

ELEMENT_TYPES = [TABLE, PIECHART] //Stores all the element types (essentially the classes)
elements = [] //Stores a list of the actual elements

function getTypesWithTag(tag) {
	var types = [];
	for(var i = 0; i < ELEMENT_TYPES.length; ++i) {
		if(jQuery.inArray(tag, ELEMENT_TYPES[i].tags) > -1 ) {
			types.push( ELEMENT_TYPES[i] );
		}
	}
	return types;
}

if(window.location.hash) {
	//If there is a hash, we already know the id of the workspace
	WorkspaceTable.lookup( window.location.hash.slice(1) ).done(
		function(item) {
			elements = JSON.parse(item.data);
			console.log("Successfully loaded wall from Azure with id " + item.id);
		}
	);
}
else {
	//If there isn't a hash, we don't have an id, so make a new workspace
	WorkspaceTable.insert( {
		data : JSON.stringify(elements)
	} ).done(
		function(item) {
			window.location.hash = item.id;
			console.log("Created a wall in azure with id " + item.id);
		}
	);
}

function updateDB() {
	WorkspaceTable.update( {
		id : window.location.hash.slice(1),
		data : JSON.stringify(elements)
	} ).done( function(item) {
		console.log("Successfully persisted changes to Azure with id " + item.id);
	} );
}