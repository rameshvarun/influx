//Define all operators

TIMECOLLAPSE = {
	"id" : 'timecollapse',
	"displayname" : "Time Interval Collapse",
	"tags" : ["operator"],
	"inputs" : [{
		"name" : "table",
		"type" : "table"
	}],
	"output" : {
		"type" : "table"
	},
	"initialize" : function(obj) {
		obj.interval = 15;
		obj.collapse_type = "average"
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		html = "<div>";
		
		html += "</div>";
		return html;
	},
	"postrender" : function(obj) {
	},
	"get" : function(obj) {
		//Get data array
		var table = getElement(obj.inputs.table);
		var array = table.type.get(table);
		
		return array;
	}
}

EDGEDETECTION = {
	"id" : 'edgedetection',
	"displayname" : "Edge Detection",
	"tags" : ["operator"],
	"inputs" : [{
		"name" : "image",
		"type" : "image"
	}],
	"output" : {
		"type" : "image"
	},
	"initialize" : function(obj) {
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		//Get img url
		var image = getElement(obj.inputs.image);
		var url = image.type.get(image);
		
		html = "<div>";
		html += "<img id='img_view' src='" + url + "'></img>";
		html += "</div>";
		return html;
	},
	"postrender" : function(obj) {
		Pixastic.process(
			document.getElementById('img_view'), 
			"blur", 
			null,
			function() {
			}
		);
		
		//var img = new Image();
		//document.body.appendChild(img);
	},
	"get" : function(obj) {
		//Get img url
		var image = getElement(obj.inputs.image);
		var url = image.type.get(image);
		
		return dataurl;
	}
}