if(window.location.hash) {
	//If there is a hash, we already know the id of the workspace
	WorkspaceTable.lookup( window.location.hash.slice(1) ).done(
		function(item) {
			elements = JSON.parse(item.data);
			
			//Load elements in
			for(var i = 0; i < elements.length; ++i) {
				element = elements[i];
				element.type = getTypeById(element.type.id);
				if(element.type.tags[0] == 'source') {
					newSource(element);
				}
				if(element.type.tags[0] == 'visualizer') {
					newViz(element);
				}
			}
			
			//Redraw connections
			drawConnections();
			
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