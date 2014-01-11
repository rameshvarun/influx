//Global element manipulation

ELEMENT_TYPES = [TABLE, PIECHART, BARCHART, VIDEOENGAGEMENT, COLUMNCHART, LINECHART, SCATTERCHART, AREACHART, CANDLESTICKCHART, GOOGLEMAPS] //Stores all the element types (essentially the classes)
elements = [] //Stores a list of the actual elements

function getElement(id) {
	for(var i = 0; i < elements.length; ++i) {
		if(elements[i].id == id) {
			return elements[i];
		}
	}
}

function getTypesWithTag(tag) {
	var types = [];
	for(var i = 0; i < ELEMENT_TYPES.length; ++i) {
		if(jQuery.inArray(tag, ELEMENT_TYPES[i].tags) > -1 ) {
			types.push( ELEMENT_TYPES[i] );
		}
	}
	return types;
}

function getTypeById(id) {
	for(var i = 0; i < ELEMENT_TYPES.length; ++i) {
		if(ELEMENT_TYPES[i].id == id ) {
			return ELEMENT_TYPES[i];
		}
	}
}

function formatElement(item) {
	return item.displayname;
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

function newElement(type) {
	obj = {
		type : type,
		name : "",
		inputs : {},
		id : makeid(),
		x : 0,
		y : 0
	}
	
	obj.type.initialize( obj);
	elements.push(obj);
	
	return obj;
}