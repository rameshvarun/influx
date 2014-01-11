//Define all sources

//Table source
TABLE = {
	"displayname" : "Table",
	"tags" : ["source"],
	"inputs" : [],
	"output" : {
		"type" : "table"
	},
	"initialize" : function(obj) {
		obj.data = [ [] ];
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		html = "<div>";
		
		html += "<select id='type_select'>";
		html += "<option>Table Editor</option>";
		html += "<option>CSV</option>";
		html += "<option>Excel File</option>";
		html += "<option>Google Docs</option>";
		html += "</select><br><br>";
		
		html += "<div id='table_editor' class='handsontable'></div>"
		
		html += "</div>";
		return html;
	},
	"postrender" : function(obj) {
		$("#type_select").select2();
		$('#table_editor').handsontable({
			data : obj.data,
			minRows: 2,
			minCols: 2,
			//minSpareCols : 2,
			//minSpareRows : 2,
			colHeaders: true,
			contextMenu: true,
			afterChange: function (change, source) {
				obj.data = $('#table_editor').data('handsontable').getData();
			}
		});
	},
	"get" : function(obj) {
		return obj.data;
	}
}