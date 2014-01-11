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