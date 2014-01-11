//Define all sources

var maxed = false
    , resizeTimeout
    , availableWidth
    , availableHeight
    , $window = $(window)
    , $table_editor = $('#table_editor');

var calculateSize = function () {
    var offset = $table_editor.offset();
    availableWidth = $window.width() - offset.left + $window.scrollLeft();
    availableHeight = $window.height() - offset.top + $window.scrollTop();
};
$window.on('resize', calculateSize);

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
		
		html += "<div id='table_editor' class='handsontable'></div>"
		
		html += "</div>";
		return html;
	},
	"postrender" : function(obj) {
		$('#table_editor').handsontable({
			data : obj.data,
			rowHeaders: true,
			colHeaders: true,
			minRows: 1000,
			minCols: 26,
			minSpareCols : 1,
			minSpareRows : 1,
			stretchH: 'all',
			colHeaders: true,
			contextMenu: true,
			width: $('#preview').width(),
		    height: $('#preview').height(),
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
		obj.imagedata = null;
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		html = "<table style='width:100%;height:100%;'><tbody>";
		html += "<tr><td style='text-align:center;color:rgb(0,0,0); '><br><br><br><br>Enter Image URL: <input id='image_url' type='text'></input></td></tr>";
		html += "<tr><td style='text-align:center; vertical-align:middle'><center><canvas id='image_preview' ></canvas></center></td></tr>";
		html += "</tbody></table>";
		
		return html;
	},
	"postrender" : function(obj) {
		$('#image_url').val(obj.url);
		
		var image_preview = document.getElementById('image_preview');
		var image_context = image_preview.getContext('2d');
		
		function drawCanvas() {
			var imageObj = new Image();
			imageObj.onload = function() {
				image_preview.width = imageObj.width;
				image_preview.height = imageObj.height;
				image_preview.style.width = imageObj.width;
				image_preview.style.height = imageObj.height; 
				image_context.drawImage(imageObj, 0, 0);
			};
			imageObj.src = obj.url;
		}
		drawCanvas();
		
		$('#image_url').change(function() {
			obj.url = $('#image_url').val();
			updateDB();
			if (TogetherJS.running)
				TogetherJS.send({ type : "update_element", obj : obj });
			drawCanvas()
		});
	},
	"get" : function(obj, result) {
	}
}