sCount = 0;
sLeft = $(window).width()*0.05;
oCount = 0;
oLeft = $(window).width()*0.05;
vCount = 0;
vLeft = $(window).width()*0.05;

var MAX_ROW_COUNT = 4;

$( document ).tooltip();

var render_error = "<table style='width:100%; height:100%; '><tbody><tr><td style='text-align:center; vertical-align:middle'><h1>Could not render this element.</h1></td></tr></tbody></table>";

//Populate type selectors
$('.type_selector').each( function() {
	var types = getTypesWithTag( $(this).attr('element_type') );
	$(this).select2( {
		data : types,
		formatSelection: formatElement,
		formatResult: formatElement
	} );
	$(this).select2("val", types[0].id);
} );

// Sources
$("#newSource").click(function() {
	$("#sourceName").val('');
	$( "#newSourceDialog" ).dialog({
		width: 250,
		dialogClass: "no-close",
		position: { my: "left top", at: "right+50 top-20", of: $("#newSource")},
		buttons: [
			{
				text: "OK",
				click: function() {
					$( "#newSourceDialog" ).dialog( "close" );
					newSource( );
				}
			},
			{
				text: "CANCEL",
				click: function() {
					$( "#newSourceDialog" ).dialog( "close" );
				}
			}
		]
	});
})

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
canvas.style.width ='100%';
canvas.style.height='100%';
canvas.width  = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
	
function drawCurve(begin, end) {
	begin.left = begin.left + 10;
	begin.top = begin.top - 42;
	end.left = end.left + 10;
	end.top = end.top - 42;
	
	context.beginPath();
	context.moveTo(begin.left, begin.top );
	//context.lineTo(end.left+10, end.top - 22 - 20);
	context.bezierCurveTo(begin.left, begin.top + 100, end.left, end.top - 100, end.left, end.top);
	context.lineWidth = 5;

	// line color
	context.strokeStyle = 'black';
	context.stroke();
}

function drawConnections() {
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	for(var i = 0; i < elements.length; ++i) {
		element = elements[i];
		for(var j = 0; j < element.type.inputs.length; ++j) {
			var input_name = element.type.inputs[j].name;
			var input = element.inputs[input_name];
			if(input) {
				var start_div = $(".outarrow").filter('[data-elementid="' + input + '"]');
				var end_div = $(".inbox").filter('[data-elementid="' + element.id + '"]').filter('[data-inputname="' + input_name + '"]');
				drawCurve( start_div.position(), end_div.position() );
			}
			
		}
	}
}

function out_mousedown() {
	window.start_elementid = $(this).attr('data-elementid');
	window.start_div = $(this);
}

function in_mouseup() {
	var out_element = getElement($(this).attr('data-elementid'));
	var input_name = $(this).attr('data-inputname');
	out_element.inputs[input_name] = window.start_elementid;
	
	drawConnections();
	console.log("Connected two elements.");
	
	updateDB();
	
	if (TogetherJS.running)
		TogetherJS.send({ type : "update_element", obj : out_element });
}

function newSource(obj) {
	if(!obj && $('#sourceType').val().length < 1)
		return;
		
	sCount += 1;
	
	var name;
	var source_type;
	var source_element;
	
	if(!obj) {
		name = 'Source' + sCount;
		if( $("#sourceName").val().length > 0 ) {
			name = $("#sourceName").val();
		}
		
		source_type = getTypeById($('#sourceType').val());
		source_element = newElement(source_type);
		source_element.name = name;
		
		//If the source was created here, tell the other clients in session to replicate this source
		if (TogetherJS.running) {
			TogetherJS.send({ type : "newsource", element : source_element });
		}
	}
	else {
		source_element = obj;
		source_type = obj.type;
		name = source_element.name;
	}
	

	
	$("#workArea").prepend('<div data-elementid="' + source_element.id + '" id="s' + sCount+ '" count="'+ sCount +'"class="new objButton source" style="left: ' + sLeft + 'px">' + name + '</div><div id="sourceDialog' + sCount + '" class="dialog"><label for="sourceName">Source Name</label><input value="' + name + '" id="sourceName' + sCount + '" type="text" label="sourceName"></div>')
	
	var parent = $("#s" + sCount );
	var out_arrow = $('<img class="outarrow" src="images/outarrow.png"></img>')
	$("#workArea").prepend(out_arrow);
	out_arrow.attr('title', "Output");
	out_arrow.attr('data-elementid', source_element.id );
	out_arrow.css("position", "absolute" );
	out_arrow.css("width", "20px" );
	out_arrow.css("z-index", "5" );
	out_arrow.css("top", (parent.position().top + 76 ) + "px");
	out_arrow.css("left", (parent.position().left + 80/2 - 10 ) + "px");
	
	out_arrow.mousedown( out_mousedown );
	
	sLeft += 140;
	if (sCount == MAX_ROW_COUNT) {
		$("#newSource").hide();
	};
	
	// Set Attributes
	$("#s" + sCount ).dblclick(function(){
		var count = $(this).attr('count');
		$( "#sourceDialog" + count).dialog({
			width: 250,
			dialogClass: "no-close",
			position: { my: "left top", at: "right+50 top-20", of: $("#s" + count)},
			buttons: [
			{
				text: "OK",
				click: function() {
					$( this ).dialog( "close" );
					$("#s" + count ).html( $("#sourceName" + count ).val() );
					source_element.name = $("#sourceName" + count ).val();
					if (TogetherJS.running) {
						TogetherJS.send({
							type : "change_name",
							new_name : $("#sourceName" + count ).val(),
							div : "#s" + count,
							id : source_element.id
						});
					}
				}
			},
			{
				text: "CANCEL",
				click: function() {
					$( this ).dialog( "close" );
				}
			}
			]
		});
	})
	
	$("#s" + sCount ).click(function() {
		$('#preview').html(source_element.type.render(source_element));
		source_element.type.postrender(source_element);
	});

}


//Replicate source creation
TogetherJS.hub.on('newsource', function (msg) {
	var element = msg.element;
	element.type = getTypeById(element.type.id);
	newSource(element);
});

//Replicate vis creation
TogetherJS.hub.on('newviz', function (msg) {
	var element = msg.element;
	element.type = getTypeById(element.type.id);
	newViz(element);
});

//Replicate operator creation
TogetherJS.hub.on('newoperator', function (msg) {
	var element = msg.element;
	element.type = getTypeById(element.type.id);
	newOperator(element);
});

//Element has its name changed
TogetherJS.hub.on("change_name", function (msg) {
	$(msg.div).html( msg.new_name );
	getElement(msg.id).name = msg.new_name;
});

//The element has been updated somehow
TogetherJS.hub.on('update_element', function (msg) {
	var element = msg.obj;
	element.type = getTypeById(element.type.id);
	for(var i = 0; i < elements.length; ++i) {
		if(elements[i].id == element.id) {
			elements[i] = element;
		}
	}
	drawConnections();
});

//Operators
$("#newOperator").click(function() {
	$("#operatorName").val('');
	$( "#newOperatorDialog" ).dialog({
		width: 250,
		dialogClass: "no-close",
		position: { my: "left top", at: "right+50 top-20", of: $("#newOperator")},
		buttons: [
		{
			text: "OK",
			click: function() {
				$( "#newOperatorDialog" ).dialog( "close" );
				newOperator();
			}
		},
		{
			text: "CANCEL",
			click: function() {
				$( "#newOperatorDialog" ).dialog( "close" );
			}
		}
		]
	});
})

function newOperator(obj) {
	if(!obj && $('#operatorType').val().length < 1)
		return;
		
	oCount += 1;
	
	var name;
	var operator_type;
	var operator_element;
	
	if(!obj) {
		name = 'Operator' + oCount;
		if( $("#operatorName").val().length > 0 ) {
			name = $("#operatorName").val();
		}
		
		operator_type = getTypeById($('#operatorType').val());
		operator_element = newElement(operator_type);
		operator_element.name = name;
		
		//If the operator was created here, tell the other clients in session to replicate this source
		if (TogetherJS.running) {
			TogetherJS.send({ type : "newoperator", element : operator_element });
		}
	}
	else {
		operator_element = obj;
		operator_type = obj.type;
		name = operator_element.name;
	}
	
	$("#workArea").prepend('<div data-elementid="' + operator_element.id + '" id="o' + oCount+ '" count="'+ oCount +'"class="new objButton operator" style="left: ' + oLeft + 'px">' + name + '</div><div id="operatorDialog' + oCount + '" class="dialog"><label for="operatorName">Operator Name</label><input value="' + name + '" id="operatorName' + oCount + '" type="text" label="operatorName"></div>')
	oLeft += 140;
	if (oCount == MAX_ROW_COUNT) {
		$("#newOperator").hide();
	};
	
	//Create in-boxes
	var parent = $("#o" + oCount );
	for(var i = 0; i < operator_type.inputs.length; ++i) {
		var input = operator_type.inputs[i];
		
		var in_box = $('<img class="inbox" src="images/inbox.png"></img>')
		$("#workArea").prepend(in_box);
		in_box.attr('data-elementid', operator_element.id );
		in_box.attr('title', input.name );
		in_box.attr('data-inputname', input.name );
		in_box.css("position", "absolute" );
		in_box.css("width", "20px" );
		in_box.css("z-index", "5" );
		var offset = i*30;
		in_box.css("top", (parent.position().top - 5 + offset) + "px");
		in_box.css("left", (parent.position().left + 80/2 - 10 ) + "px");
		
		in_box.mouseup( in_mouseup );
	}
	
	//Create out_arrow
	var out_arrow = $('<img class="outarrow" src="images/outarrow.png"></img>')
	$("#workArea").prepend(out_arrow);
	out_arrow.attr('title', "Output");
	out_arrow.attr('data-elementid', operator_element.id );
	out_arrow.css("position", "absolute" );
	out_arrow.css("width", "20px" );
	out_arrow.css("z-index", "5" );
	out_arrow.css("top", (parent.position().top + 76 ) + "px");
	out_arrow.css("left", (parent.position().left + 80/2 - 10 ) + "px");
	
	out_arrow.mousedown( out_mousedown );
	
	// Set Attributes
	$("#o" + oCount ).dblclick(function(){
		var count = $(this).attr('count');
		$( "#operatorDialog" + count).dialog({
			width: 250,
			dialogClass: "no-close",
			position: { my: "left top", at: "right+50 top-20", of: $("#o" + count)},
			buttons: [
			{
				text: "OK",
				click: function() {
					$( this ).dialog( "close" );
					$("#o" + count ).html( $("#operatorName" + count ).val() );
					operator_element.name = $("#operatorName" + count ).val();
					
					//Send changes to clients
					if (TogetherJS.running) {
						TogetherJS.send({
							type : "change_name",
							new_name : $("#operatorName" + count ).val(),
							div : "#o" + count,
							id : operator_element.id
						});
					}
				}
			},
			{
				text: "CANCEL",
				click: function() {
					$( this ).dialog( "close" );
				}
			}
			]
		});
	})
	
	//Preview
	$("#o" + oCount ).click(function() {
		try {
			$('#preview').html(operator_element.type.render(operator_element));
			operator_element.type.postrender(operator_element);
		}
		catch(err) {
			$('#preview').html(render_error);
		}
	});
}


// Visualizers
$("#newViz").click(function() {
	$("#vizName").val('');
	$( "#newVizDialog" ).dialog({
		width: 250,
		dialogClass: "no-close",
		position: { my: "left top", at: "right+50 top-20", of: $("#newViz")},
		buttons: [
		{
			text: "OK",
			click: function() {
				$( "#newVizDialog" ).dialog( "close" );
				newViz();
			}
		},
		{
			text: "CANCEL",
			click: function() {
				$( "#newVizDialog" ).dialog( "close" );
			}
		}
		]
	});
})


function newViz(obj) {
	if(!obj && $('#vizType').val().length < 1)
		return;
		
	vCount += 1;
	
	var name;
	var viz_type;
	var viz_element;
	
	if(!obj) {
		name = 'Viz' + vCount;
		if( $("#vizName").val().length > 0 ) {
			name = $("#vizName").val();
		}
		
		viz_type = getTypeById($('#vizType').val());
		viz_element = newElement(viz_type);
		viz_element.name = name;
		
		//If the viz was created here, tell the other clients in session to replicate this source
		if (TogetherJS.running) {
			TogetherJS.send({ type : "newviz", element : viz_element });
		}
	}
	else {
		viz_element = obj;
		viz_type = obj.type;
		name = viz_element.name;
	}
	
	$("#workArea").prepend('<div data-elementid="' + viz_element.id + '" id="v' + vCount+ '" count="'+ vCount +'"class="new objButton viz" style="left: ' + vLeft + 'px">' + name + '</div><div id="vizDialog' + vCount + '" class="dialog"><label for="vizName">Visualization Name</label><input value="' + name + '" id="vizName' + vCount + '" type="text" label="vizName"></div>')
	vLeft += 140;
	if (vCount == MAX_ROW_COUNT) {
		$("#newViz").hide();
	};
	
	//Create in-boxes
	var parent = $("#v" + vCount );
	for(var i = 0; i < viz_type.inputs.length; ++i) {
		var input = viz_type.inputs[i];
		
		var in_box = $('<img class="inbox" src="images/inbox.png"></img>')
		$("#workArea").prepend(in_box);
		in_box.attr('data-elementid', viz_element.id );
		in_box.attr('title', input.name );
		in_box.attr('data-inputname', input.name );
		in_box.css("position", "absolute" );
		in_box.css("width", "20px" );
		in_box.css("z-index", "5" );
		var offset = i*30;
		in_box.css("top", (parent.position().top - 5 + offset) + "px");
		in_box.css("left", (parent.position().left + 80/2 - 10 ) + "px");
		
		in_box.mouseup( in_mouseup );
	}
	
	// Set Attributes
	$("#v" + vCount ).dblclick(function(){
		var count = $(this).attr('count');
		$( "#vizDialog" + count).dialog({
			width: 250,
			dialogClass: "no-close",
			position: { my: "left top", at: "right+50 top-20", of: $("#v" + count)},
			buttons: [
			{
				text: "OK",
				click: function() {
					$( this ).dialog( "close" );
					$("#v" + count ).html( $("#vizName" + count ).val() );
					viz_element.name = $("#vizName" + count ).val();
					
					//Send changes to clients
					if (TogetherJS.running) {
						TogetherJS.send({
							type : "change_name",
							new_name : $("#vizName" + count ).val(),
							div : "#v" + count,
							id : viz_element.id
						});
					}
				}
			},
			{
				text: "CANCEL",
				click: function() {
					$( this ).dialog( "close" );
				}
			}
			]
		});
	})
	
	$("#v" + vCount ).click(function() {
		try {
			$('#preview').html(viz_element.type.render(viz_element));
			viz_element.type.postrender(viz_element);
		}
		catch(err) {
			$('#preview').html(render_error);
		}
	});
}



