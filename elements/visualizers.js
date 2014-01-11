//Define all visualizers
var chart_code =  "<table style='width:100%; height:100%; '><tbody><tr><td style='text-align:center; vertical-align:middle'><center><div id='chart_div'></div></center></td></tr></tbody></table>";
PIECHART = {
	"displayname" : "Pie Chart",
	"id" : 'piechart',
	"tags" : ["visualizer"],
	"inputs" : [{
		"name" : "table",
		"type" : "table"
	}],
	"output" : null,
	"initialize" : function(obj) {
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		return chart_code;
	},
	"postrender" : function(obj) {
		//Create the data table
		var data = new google.visualization.DataTable();
		
		//Get data array
		var table = getElement(obj.inputs.table);
		var array = table.type.get(table);
		data.addColumn('string', array[0][0]);
		data.addColumn('number', array[0][1]);
		
		for(var i = 1; i < array.length; ++i) {
			data.addRow( [  array[i][0], parseFloat(array[i][1])  ] );
		}
		
		// Set chart options
        var options = {
			'title': obj.name,
            'width': $('#preview').width(),
            'height': $('#preview').height()
		};
		
		// Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
	}
}

BARCHART = {
	"displayname" : "Bar Chart",
	"id" : 'barchart',
	"tags" : ["visualizer"],
	"inputs" : [{
		"name" : "table",
		"type" : "table"
	}],
	"output" : null,
	"initialize" : function(obj) {
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		return chart_code;
	},
	"postrender" : function(obj) {
		//Get data array
		var table = getElement(obj.inputs.table);
		var array = table.type.get(table);

		//Create the data table
		var data = new google.visualization.arrayToDataTable(array);
		
		// Set chart options
        var options = {
			'title': obj.name,
            'width': $('#preview').width(),
            'height': $('#preview').height()
		};
		
		// Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
	}
}

VIDEOENGAGEMENT = {
	"displayname" : "Video Engagement",
	"id" : 'videngage',
	"tags" : ["visualizer"],
	"inputs" : [{
		"name" : "table",
		"type" : "table"
	}],
	"output" : null,
	"initialize" : function(obj) {
		obj.videoid = "";
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		html = "<table style='width:100%;'><tbody>";
		html += "<tr><td style='text-align:center;color:rgb(0,0,0); '><br><br><br><br>Enter Video ID: <input id='video_id' type='text'></input></td></tr>";
		html += "<tr><td style='text-align:center; vertical-align:middle'><center><div id='ytplayer'></div></center></td></tr>";
		html += "<tr><td style='text-align:center; vertical-align:middle'><center><div style='position:relative;width:640px;height:10px;' id='timeline' ></center></td></tr>";
		html += "</tbody></table>";
		
		return html;
	},
	"postrender" : function(obj) {
		$('#video_id').val(obj.videoid);
		
		//Get data array
		var table = getElement(obj.inputs.table);
		var array = table.type.get(table);

		$('#video_id').change(function() {
			//console.log( );
			player.loadVideoById( $('#video_id').val() );
			obj.videoid = $('#video_id').val();
			updateDB();
			if (TogetherJS.running)
				TogetherJS.send({ type : "update_element", obj : obj });
		})
		
		player = new YT.Player('ytplayer', {
		  height: '390',
		  width: '640',
		  videoId: $('#video_id').val()
		});
		
		for(var i = 1; i < array.length; ++i) {
			$("#timeline").append('<div title="' + array[i][0] + '" style="position:absolute; color:rgb(0,0,0); left:' + (array[i][1]*640.0/100) + 'px;">|</div>');
		}
	}
}

COLUMNCHART = {
	"displayname" : "Column Chart",
	"id" : 'colchart',
	"tags" : ["visualizer"],
	"inputs" : [{
		"name" : "table",
		"type" : "table"
	}],
	"output" : null,
	"initialize" : function(obj) {
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		return chart_code;
	},
	"postrender" : function(obj) {
		//Get data array
		var table = getElement(obj.inputs.table);
		var array = table.type.get(table);

		//Create the data table
		var data = new google.visualization.arrayToDataTable(array);
		
		// Set chart options
        var options = {
			'title': obj.name,
            'width': $('#preview').width(),
            'height': $('#preview').height()
		};
		
		// Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);
	}
}

LINECHART = {
	"displayname" : "Line Chart",
	"id" : 'linechart',
	"tags" : ["visualizer"],
	"inputs" : [{
		"name" : "table",
		"type" : "table"
	}],
	"output" : null,
	"initialize" : function(obj) {
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		return chart_code;
	},
	"postrender" : function(obj) {
		//Get data array
		var table = getElement(obj.inputs.table);
		var array = table.type.get(table);

		//Create the data table
		var data = new google.visualization.arrayToDataTable(array);
		
		// Set chart options
        var options = {
			'title': obj.name,
            'width': $('#preview').width(),
            'height': $('#preview').height()
		};
		
		// Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
	}
}

SCATTERCHART = {
	"displayname" : "Scatter Chart",
	"id" : 'scatterchart',
	"tags" : ["visualizer"],
	"inputs" : [{
		"name" : "table",
		"type" : "table"
	}],
	"output" : null,
	"initialize" : function(obj) {
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		return chart_code;
	},
	"postrender" : function(obj) {
		//Get data array
		var table = getElement(obj.inputs.table);
		var array = table.type.get(table);

		//Create the data table
		var data = new google.visualization.arrayToDataTable(array);
		
		// Set chart options
        var options = {
			'title': obj.name,
            'width': $('#preview').width(),
            'height': $('#preview').height()
		};
		
		// Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
        chart.draw(data, options);
	}
}

AREACHART = {
	"displayname" : "Area Chart",
	"id" : 'areachart',
	"tags" : ["visualizer"],
	"inputs" : [{
		"name" : "table",
		"type" : "table"
	}],
	"output" : null,
	"initialize" : function(obj) {
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		return chart_code;
	},
	"postrender" : function(obj) {
		//Get data array
		var table = getElement(obj.inputs.table);
		var array = table.type.get(table);

		//Create the data table
		var data = new google.visualization.arrayToDataTable(array);
		
		// Set chart options
        var options = {
			'title': obj.name,
            'width': $('#preview').width(),
            'height': $('#preview').height()
		};
		
		// Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(data, options);
	}
}

CANDLESTICKCHART = {
	"displayname" : "Candlestick Chart",
	"id" : 'candlechart',
	"tags" : ["visualizer"],
	"inputs" : [{
		"name" : "table",
		"type" : "table"
	}],
	"output" : null,
	"initialize" : function(obj) {
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		return chart_code;
	},
	"postrender" : function(obj) {
		//Get data array
		var table = getElement(obj.inputs.table);
		var array = table.type.get(table);

		//Create the data table
		var data = new google.visualization.arrayToDataTable(array, true);
		
		// Set chart options
        var options = {
			'title': obj.name,
            'width': $('#preview').width(),
            'height': $('#preview').height()
		};
		
		// Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
        chart.draw(data, options);
	}
}

GOOGLEMAPS = {
	"displayname" : "Google Maps",
	"id" : 'googlemaps',
	"tags" : ["visualizer"],
	"inputs" : [{
		"name" : "table",
		"type" : "table"
	}],
	"output" : null,
	"initialize" : function(obj) {
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		return "<div><div id='map-canvas'></div></div>";
	},
	"postrender" : function(obj) {
		//Get data array
		var table = getElement(obj.inputs.table);
		var array = table.type.get(table);
		
		//Size div to full preview area
		$('#map-canvas').width($('#preview').width());
		$('#map-canvas').height($('#preview').height());
		
		var mapOptions = {
			center: new google.maps.LatLng(-34.397, 150.644),
			zoom: 8,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		var bounds = new google.maps.LatLngBounds();
		
		var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		
		for(var i = 1; i < array.length; ++i) {
			latlong = new google.maps.LatLng(array[i][0], array[i][1]);
			marker = new google.maps.Marker({
				position : latlong,
				map : map
			});
			
			if(array[i].length > 2)
				marker.setTitle(array[i][2]);
			
			bounds.extend(latlong);
		}
		
		map.fitBounds(bounds);
	}
}

IMAGEVIEW = {
	"displayname" : "Image Viewer",
	"id" : 'imageview',
	"tags" : ["visualizer"],
	"inputs" : [{
		"name" : "image",
		"type" : "image"
	}],
	"output" : null,
	"initialize" : function(obj) {
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		return "<canvas id='image_preview' ></canvas>";
	},
	"postrender" : function(obj) {
		var image = getElement(obj.inputs.image);
		image.type.get(image, function(dataurl) {
			var image_preview = document.getElementById('image_preview');
			var image_context = image_preview.getContext('2d');
		
			var imageObj = new Image();
			imageObj.onload = function() {
				image_preview.width = imageObj.width;
				image_preview.height = imageObj.height;
				image_preview.style.width = imageObj.width;
				image_preview.style.height = imageObj.height; 
				image_context.drawImage(imageObj, 0, 0);
			};
			imageObj.src = dataurl;
		} );
	}
}