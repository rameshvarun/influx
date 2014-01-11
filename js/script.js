sCount = 0;
sLeft = $(window).width()*0.05;
oCount = 0;
oLeft = $(window).width()*0.05;
vCount = 0;
vLeft = $(window).width()*0.05;
// Source
$("#newSource").click(function() {
	$( "#newSourceDialog" ).dialog({
		width: 250,
		dialogClass: "no-close",
		position: { my: "left top", at: "right+50 top-20", of: $("#newSource")},
		buttons: [
		{
			text: "OK",
			click: function() {
				$( this ).dialog( "close" );
				newSource();
			}
		}
		]
	});
	$( "#newSourceDialog" ).dialog( "open" );
})

function newSource() {
	sCount += 1;
	$("#workArea").prepend('<div id="s' + sCount+ '" count="'+ sCount +'"class="new objButton source" style="left: ' + sLeft + 'px">Source' + sCount + '</div><div id="sourceDialog' + sCount + '" class="dialog"><form><label for="sourceName">Source Name</label><input type="text" label="sourceName"></form></div>')
	sLeft += 140;
	if (sCount == 3) {
		$("#newSource").hide();
	};
	

	
	// Set Attributes
	$("#s" + sCount ).click(function(){
		$( "#sourceDialog" + sCount).dialog({
			width: 250,
			dialogClass: "no-close",
			position: { my: "left top", at: "right+50 top-20", of: $("#s" + sCount)},
			buttons: [
			{
				text: "OK",
				click: function() {
					$( this ).dialog( "close" );
				}
			}
			]
		});
	})

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












