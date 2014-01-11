sCount = 0;
sLeft = $(window).width()*0.05;
oCount = 0;
oLeft = $(window).width()*0.05;
vCount = 0;
vLeft = $(window).width()*0.05;

$( document ).tooltip();

// Source
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
$('#sourceType').select2( {
	data : getTypesWithTag('source'),
	formatSelection: formatElement,
    formatResult: formatElement
} );

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


// Operator
$("#newOperator").click(function() {
	$( "#newOperatorDialog" ).dialog({
		width: 250,
		dialogClass: "no-close",
		position: { my: "left top", at: "right+50 top-20", of: $("#newOperator")},
		buttons: [
		{
			text: "OK",
			click: function() {
				$( this ).dialog( "close" );
				newOperator();
			}
		}
		]
	});
	$( "#newOperatorDialog" ).dialog( "open" );
})
function newOperator() {
	oCount += 1;
	$("#workArea").prepend('<div id=o"' + oCount+ '" class="new objButton operator" style="left: ' + oLeft + 'px">Operator' + oCount + '</div>')
	oLeft += 140;
	if (oCount == 3) {
		$("#newOperator").hide();
	};
}

// Viz
$("#newViz").click(function() {
	$( "#newVizDialog" ).dialog({
		width: 250,
		dialogClass: "no-close",
		position: { my: "left top", at: "right+50 top-20", of: $("#newViz")},
		buttons: [
		{
			text: "OK",
			click: function() {
				$( this ).dialog( "close" );
				newViz();
			}
		}
		]
	});
	$( "#newVizDialog" ).dialog( "open" );
})
function newViz() {
	vCount += 1;
	$("#workArea").prepend('<div id=v"' + vCount+ '" class="new objButton viz" style="left: ' + vLeft + 'px">Viz' + vCount + '</div>')
	vLeft += 140;
	if (vCount == 3) {
		$("#newViz").hide();
	};
}












