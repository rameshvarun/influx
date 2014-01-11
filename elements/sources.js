//Define all sources

//Table source
TABLE = {
	"id" : 'table',
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
			minSpareCols : 1,
			minSpareRows : 1,
			colHeaders: true,
			contextMenu: true,
			afterChange: function (change, source) {
				obj.data = JSON.parse(JSON.stringify($('#table_editor').data('handsontable').getData()));
				
				for(var row = 0; row < obj.data.length; ++row) {
					var count = 0;
					for(var col = 0; col < obj.data[row].length; ++col) {
						if( obj.data[row][col] != null ) {
							++count;
							if( !isNaN(parseFloat(obj.data[row][col])) ) {
								obj.data[row][col] = parseFloat(obj.data[row][col]);
							}
						}
						if( obj.data[row][col] == null ) {
							obj.data[row].splice(col, 1);
							--col;
						}
					}
					if(count == 0) {
						obj.data.splice(row, 1);
					}
				}
			}
		});
	},
	"get" : function(obj) {
		return obj.data;
	}
}