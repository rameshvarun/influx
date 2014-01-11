//Define all visualizers

PIECHART = {
	"displayname" : "Pie Chart",
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
		return "<div><div id='chart_div'></div></div>";
	},
	"postrender" : function(obj) {
		//Create the data table
		var data = new google.visualization.DataTable();
		
		//Get data array
		var array = obj.inputs.table.type.get(obj.inputs.table);
		data.addColumn('string', array[0][0]);
		data.addColumn('number', array[0][1]);
		
		for(var i = 1; i < array.length; ++i) {
			data.addRow( [  array[i][0], parseFloat(array[i][1])  ] );
		}
		
		// Set chart options
        var options = {
			'title': obj.name,
            'width': 400,
            'height':300
		};
		
		// Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
	}
}

BARCHART = {
	"displayname" : "Bar Chart",
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
		return "<div><div id='chart_div'></div></div>";
	},
	"postrender" : function(obj) {
		//Get data array
		var array = obj.inputs.table.type.get(obj.inputs.table);

		//Create the data table
		var data = new google.visualization.arrayToDataTable(array);
		
		// Set chart options
        var options = {
			'title': obj.name,
            'width': 400,
            'height':300
		};
		
		// Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
	}
}

VIDEOENGAGEMENT = {
	"displayname" : "Video Engagement",
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
		return "<div><input id='video_id' type='text'></input><br><div id='ytplayer'></div><br><div id='timeline' width='640px'></div>";
	},
	"postrender" : function(obj) {
		//Get data array
		var array = obj.inputs.table.type.get(obj.inputs.table);

		$('#video_id').change(function() {
			//console.log( );
			player.loadVideoById( $('#video_id').val() );
		})
		
		player = new YT.Player('ytplayer', {
		  height: '390',
		  width: '640',
		  videoId: $('#video_id').val()
		});
		
		for(var i = 1; i < array.length; ++i) {
			$("#timeline").append('<div title="' + array[i][0] + '" style="position:absolute; left:' + array[i][1]*640/100 + 'px;">|</div>');
		}
	}
}

COLUMNCHART = {
	"displayname" : "Column Chart",
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
		return "<div><div id='chart_div'></div></div>";
	},
	"postrender" : function(obj) {
		//Get data array
		var array = obj.inputs.table.type.get(obj.inputs.table);

		//Create the data table
		var data = new google.visualization.arrayToDataTable(array);
		
		// Set chart options
        var options = {
			'title': obj.name,
            'width': 400,
            'height':300
		};
		
		// Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);
	}
}

LINECHART = {
	"displayname" : "Line Chart",
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
		return "<div><div id='chart_div'></div></div>";
	},
	"postrender" : function(obj) {
		//Get data array
		var array = obj.inputs.table.type.get(obj.inputs.table);

		//Create the data table
		var data = new google.visualization.arrayToDataTable(array);
		
		// Set chart options
        var options = {
			'title': obj.name,
            'width': 400,
            'height':300
		};
		
		// Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
	}
}

SCATTERCHART = {
	"displayname" : "Scatter Chart",
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
		return "<div><div id='chart_div'></div></div>";
	},
	"postrender" : function(obj) {
		//Get data array
		var array = obj.inputs.table.type.get(obj.inputs.table);

		//Create the data table
		var data = new google.visualization.arrayToDataTable(array);
		
		// Set chart options
        var options = {
			'title': obj.name,
            'width': 400,
            'height':300
		};
		
		// Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
        chart.draw(data, options);
	}
}

AREACHART = {
	"displayname" : "Area Chart",
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
		return "<div><div id='chart_div'></div></div>";
	},
	"postrender" : function(obj) {
		//Get data array
		var array = obj.inputs.table.type.get(obj.inputs.table);

		//Create the data table
		var data = new google.visualization.arrayToDataTable(array);
		
		// Set chart options
        var options = {
			'title': obj.name,
            'width': 400,
            'height':300
		};
		
		// Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(data, options);
	}
}