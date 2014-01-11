//Define all operators

TIMECOLLAPSE = {
	"id" : 'timecollapse',
	"displayname" : "Time Interval Collapse",
	"tags" : ["operator"],
	"inputs" : [{
		"name" : "table",
		"type" : "table"
	}],
	"output" : {
		"type" : "table"
	},
	"initialize" : function(obj) {
		obj.interval = 60;
		obj.collapse_type = "average"
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		html = "<div>";
		html += "Collapsing Technique: <select id='collapse_type'><option value='average'>Average of Sub-Intervals</option><option value='first'>First Sub-Intervals</option><option value='largest'>Largest Sub-Interval</option></select>";
		html += "Interval Time: <input type='text' id='interval_time'></input>";
		html += "</div>";
		return html;
	},
	"postrender" : function(obj) {
		function change() {
			obj.collapse_type = $("#collapse_type").val();
			obj.interval = parseInt($("#interval_time").val());
			updateDB();
			if (TogetherJS.running)
				TogetherJS.send({ type : "update_element", obj : obj });
		}
		
		$("#collapse_type").select2();
		$("#collapse_type").select2('val', obj.collapse_type)
		$("#collapse_type").on("change", change);
		
		$("#interval_time").val(obj.interval);
		$("#interval_time").on("change", change);
	},
	"get" : function(obj) {
		//Get data array
		var table = getElement(obj.inputs.table);
		var array = table.type.get(table);
		
		var newarray = [ array[0] ];
		var i = 0;
		while(true) {
			var sub_intervals = [];
			for(var j = 1; j < array.length; ++j) {
				if(array[j][0] >= i*obj.interval && array[j][0] < (i+1)*obj.interval)
					sub_intervals.push( array[j] );
			}
			if(sub_intervals.length < 1)
				break;
			
			if(obj.collapse_type == "first")
				newarray.push( [ i*obj.interval, sub_intervals[0][1]] );
			if(obj.collapse_type == "average") {
				var sum = 0;
				$.each(sub_intervals, function(index, value) {
					sum += value[1];
				});
				newarray.push( [i*obj.interval, sum/sub_intervals.length] );
			}
			if(obj.collapse_type == "largest") {
				var max = null;
				$.each(sub_intervals, function(index, value) {
					if(max == null || value[1] > max)
						max = value[1];
				});
				newarray.push( [i*obj.interval, max] );
			}
			
			++i;
		}
		
		return newarray;
	}
}

IMAGEINVERT = {
	"id" : 'imageinvert',
	"displayname" : "Invert Image",
	"tags" : ["operator"],
	"inputs" : [{
		"name" : "image",
		"type" : "image"
	}],
	"output" : {
		"type" : "image"
	},
	"initialize" : function(obj) {
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		return "";
	},
	"postrender" : function(obj) {
	},
	"get" : function(obj, result) {
		var image = getElement(obj.inputs.image);
		image.type.get(image, function(dataurl) {
			var image_preview = document.createElement('canvas');
			var image_context = image_preview.getContext('2d');
		
			var imageObj = new Image();
			imageObj.onload = function() {
				image_preview.width = imageObj.width;
				image_preview.height = imageObj.height;
				image_preview.style.width = imageObj.width;
				image_preview.style.height = imageObj.height; 
				image_context.drawImage(imageObj, 0, 0);
				
				var imageData = image_context.getImageData(0, 0, imageObj.width, imageObj.height);
				var data = imageData.data;

				for(var i = 0; i < data.length; i += 4) {
				  // red
				  data[i] = 255 - data[i];
				  // green
				  data[i + 1] = 255 - data[i + 1];
				  // blue
				  data[i + 2] = 255 - data[i + 2];
				}

				// overwrite original image
				image_context.putImageData(imageData, 0, 0);
				
				result( image_preview.toDataURL() );
			};
			imageObj.src = dataurl;
		} );
	}
}

IMAGEINVERT = {
	"id" : 'imageinvert',
	"displayname" : "Invert Image",
	"tags" : ["operator"],
	"inputs" : [{
		"name" : "image",
		"type" : "image"
	}],
	"output" : {
		"type" : "image"
	},
	"initialize" : function(obj) {
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		return "";
	},
	"postrender" : function(obj) {
	},
	"get" : function(obj, result) {
		var image = getElement(obj.inputs.image);
		image.type.get(image, function(dataurl) {
			var image_preview = document.createElement('canvas');
			var image_context = image_preview.getContext('2d');
		
			var imageObj = new Image();
			imageObj.onload = function() {
				image_preview.width = imageObj.width;
				image_preview.height = imageObj.height;
				image_preview.style.width = imageObj.width;
				image_preview.style.height = imageObj.height; 
				image_context.drawImage(imageObj, 0, 0);
				
				var imageData = image_context.getImageData(0, 0, imageObj.width, imageObj.height);
				var data = imageData.data;

				for(var i = 0; i < data.length; i += 4) {
				  // red
				  data[i] = 255 - data[i];
				  // green
				  data[i + 1] = 255 - data[i + 1];
				  // blue
				  data[i + 2] = 255 - data[i + 2];
				}

				// overwrite original image
				image_context.putImageData(imageData, 0, 0);
				
				result( image_preview.toDataURL() );
			};
			imageObj.src = dataurl;
		} );
	}
}

IMAGESHARPEN = {
	"id" : 'imagesharpen',
	"displayname" : "Sharpen Image",
	"tags" : ["operator"],
	"inputs" : [{
		"name" : "image",
		"type" : "image"
	}],
	"output" : {
		"type" : "image"
	},
	"initialize" : function(obj) {
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		return "";
	},
	"postrender" : function(obj) {
	},
	"get" : function(obj, result) {
		var weights =  [  0, -1,  0, -1,  5, -1, 0, -1,  0 ];
		var image = getElement(obj.inputs.image);
		image.type.get(image, function(dataurl) {
			var image_preview = document.createElement('canvas');
			var image_context = image_preview.getContext('2d');
		
			var imageObj = new Image();
			imageObj.onload = function() {
				image_preview.width = imageObj.width;
				image_preview.height = imageObj.height;
				image_preview.style.width = imageObj.width;
				image_preview.style.height = imageObj.height; 
				image_context.drawImage(imageObj, 0, 0);
				
				var imageData = image_context.getImageData(0, 0, imageObj.width, imageObj.height);
				
				var side = Math.round(Math.sqrt(weights.length));
				var halfSide = Math.floor(side/2);
				var src = imageData.data;
				var sw = imageData.width;
				var sh = imageData.height;
				var w = sw;
				var h = sh;
				var output = image_context.createImageData(w, h);
				var dst = output.data;
				
				  var alphaFac = 0;
				  for (var y=0; y<h; y++) {
					for (var x=0; x<w; x++) {
					  var sy = y;
					  var sx = x;
					  var dstOff = (y*w+x)*4;
					  // calculate the weighed sum of the source image pixels that
					  // fall under the convolution matrix
					  var r=0, g=0, b=0, a=0;
					  for (var cy=0; cy<side; cy++) {
						for (var cx=0; cx<side; cx++) {
						  var scy = sy + cy - halfSide;
						  var scx = sx + cx - halfSide;
						  if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
							var srcOff = (scy*sw+scx)*4;
							var wt = weights[cy*side+cx];
							r += src[srcOff] * wt;
							g += src[srcOff+1] * wt;
							b += src[srcOff+2] * wt;
							a += src[srcOff+3] * wt;
						  }
						}
					  }
					  dst[dstOff] = r;
					  dst[dstOff+1] = g;
					  dst[dstOff+2] = b;
					  dst[dstOff+3] = a + alphaFac*(255-a);
					}
				  }
				  
				// overwrite original image
				image_context.putImageData(output, 0, 0);
				
				result( image_preview.toDataURL() );
			};
			imageObj.src = dataurl;
		} );
	}
}

COLORPROFILE = {
	"id" : 'colorprofile',
	"displayname" : "RGB Profile",
	"tags" : ["operator"],
	"inputs" : [{
		"name" : "image",
		"type" : "image"
	}],
	"output" : {
		"type" : "table"
	},
	"initialize" : function(obj) {
	},
	"serialize" : function(obj) {
	},
	"deserialize" : function(obj) {
	},
	"render" : function(obj) {
		return "";
	},
	"postrender" : function(obj) {
	},
	"getasync" : function(obj, result) {
		var profile = [ ['Color', 'Prevalence'], ['Red', 0], ['Green', 0], ['Blue', 0] ]
		var image = getElement(obj.inputs.image);
		image.type.get(image, function(dataurl) {
			var image_preview = document.createElement('canvas');
			var image_context = image_preview.getContext('2d');
		
			var imageObj = new Image();
			imageObj.onload = function() {
				image_preview.width = imageObj.width;
				image_preview.height = imageObj.height;
				image_preview.style.width = imageObj.width;
				image_preview.style.height = imageObj.height; 
				image_context.drawImage(imageObj, 0, 0);
				
				var imageData = image_context.getImageData(0, 0, imageObj.width, imageObj.height);
				var data = imageData.data;

				for(var i = 0; i < data.length; i += 4) {
				  profile[1][1] += data[i];
				  profile[2][1] += data[i + 1];
				  profile[3][1] += data[i + 2];
				}

				// overwrite original image
				image_context.putImageData(imageData, 0, 0);
				
				result( profile );
			};
			imageObj.src = dataurl;
		} );
	}
}