ELEMENT_TYPES = [TABLE, PIECHART]

function getTypesWithTag(tag) {
	var types = [];
	for(var i = 0; i < ELEMENT_TYPES.length; ++i) {
		if(jQuery.inArray(tag, ELEMENT_TYPES[i].tags) > -1 ) {
			types.push( ELEMENT_TYPES[i] );
		}
	}
	return types;
}