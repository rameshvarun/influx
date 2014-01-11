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