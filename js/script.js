sCount = 0;
sLeft = $(window).width()*0.05;
oCount = 0;
oLeft = $(window).width()*0.05;
vCount = 0;
vLeft = $(window).width()*0.05;

$( document ).tooltip();

var render_error = "<h1>Could not render this element.</h1>";

//Populate type selectors
$('.type_selector').each( function() {
	$(this).select2( {
		data : getTypesWithTag( $(this).attr('element_type') ),
		formatSelection: formatElement,
		formatResult: formatElement
	} );
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

	context.beginPath();
	context.moveTo(begin.left+10, begin.top - 22 - 20);
	context.lineTo(end.left+10, end.top - 22 - 20);
	context.lineWidth = 5;

	// line color
	context.strokeStyle = 'black';
	context.stroke();
}

jQuery.fn.cssNum = function(prop){
    var v = parseInt(this.css(prop),10);
    return isNaN(v) ? 0 : v;
};

function out_mousedown() {
	window.start_elementid = $(this).attr('data-elementid');
	window.start_div = $(this);
}
function in_mouseup() {
	var in_element = getElement(window.start_elementid);
	var out_element = getElement($(this).attr('data-elementid'));
	var input_name = $(this).attr('data-inputname');
	out_element.inputs[input_name] = in_element;
	
	drawCurve( window.start_div.position(), $(this).position() );
	console.log("Connected two elements.");
}

function newSource() {
	sCount += 1;
	var name = 'Source' + sCount;
	if( $("#sourceName").val().length > 0 ) {
		name = $("#sourceName").val();
	}
	
	var source_type = getTypeById($('#sourceType').val());
	var source_element = newElement(source_type);
	source_element.name = name;
	
	$("#workArea").prepend('<div data-elementid="' + source_element.id + '" id="s' + sCount+ '" count="'+ sCount +'"class="new objButton source" style="left: ' + sLeft + 'px">' + name + '</div><div id="sourceDialog' + sCount + '" class="dialog"><label for="sourceName">Source Name</label><input value="' + name + '" id="sourceName' + sCount + '" type="text" label="sourceName"></div>')
	
	var parent = $("#s" + sCount );
	var out_arrow = $('<img src="images/outarrow.png"></img>')
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
	if (sCount == 3) {
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
		}
		]
	});
})


function newViz() {
	vCount += 1;
	var name = 'Viz' + vCount;
	if( $("#vizName").val().length > 0 ) {
		name = $("#vizName").val();
	}
	
	var viz_type = getTypeById($('#vizType').val());
	var viz_element = newElement(viz_type);
	viz_element.name = name;
	
	$("#workArea").prepend('<div data-elementid="' + viz_element.id + '" id="v' + vCount+ '" count="'+ vCount +'"class="new objButton viz" style="left: ' + vLeft + 'px">' + name + '</div><div id="vizDialog' + vCount + '" class="dialog"><label for="vizName">Visualization Name</label><input value="' + name + '" id="vizName' + vCount + '" type="text" label="vizName"></div>')
	vLeft += 140;
	if (vCount == 3) {
		$("#newViz").hide();
	};
	
	//Create in-boxes
	var parent = $("#v" + vCount );
	for(var i = 0; i < viz_type.inputs.length; ++i) {
		var input = viz_type.inputs[i];
		
		var in_box = $('<img src="images/inbox.png"></img>')
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



