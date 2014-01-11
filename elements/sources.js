//Define all sources

var maxed = false
    , resizeTimeout
    , availableWidth
    , availableHeight
    , $window = $(window)
    , $table_editor = $('#table_editor');

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
				
				updateDB();
				if (TogetherJS.running)
					TogetherJS.send({ type : "update_element", obj : obj });

			}
		});
	},
	"get" : function(obj) {
		return obj.data;
	}
}

IMAGE = {
	"id" : 'image',
	"displayname" : "Image",
	"tags" : ["source"],
	"inputs" : [],
	"output" : {
		"type" : "image"
	},
	"initialize" : function(obj) {
		obj.url = "";
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		html = "<table style='width:100%;height:100%;'><tbody>";
		html += "<tr><td style='text-align:center;color:rgb(0,0,0); '><br><br><br><br>Enter Image URL: <input id='image_url' type='text'></input></td></tr>";
		html += "<tr><td style='text-align:center; vertical-align:middle'><center><img id='image_container' src='" + obj.url + "'></img></center></td></tr>";
		html += "</tbody></table>";
		
		return html;
	},
	"postrender" : function(obj) {
		$('#image_url').val(obj.url);
		
		$('#image_url').change(function() {
			$('#image_container').attr('src', $('#image_url').val() );
			obj.url = $('#image_url').val();
			updateDB();
			if (TogetherJS.running)
				TogetherJS.send({ type : "update_element", obj : obj });
		});
	},
	"get" : function(obj) {
		return "";
	}
}