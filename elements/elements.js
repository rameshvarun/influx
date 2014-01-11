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