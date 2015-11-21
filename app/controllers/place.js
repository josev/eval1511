var mongoose = require('mongoose'),
	Location = require('../models/Location');

var PLACES_LENGTH = 5;

exports.findNearby = function(req, res, next){
 	var coord = JSON.parse(req.body);
	Location.find().exec(
		function(err, locations){
	 		var distances = new Array();
	 		var orderLocs = new Array();
	 		var max = 1000;
			for(var i=0; i< locations.length; i++){
				var dist = distance(coord, locations[i]["ubicacion"]);
				if(dist < max){
					var inToInsert = indexSmallest(dist, distances);
					distances.splice(inToInsert, 0, dist);
					orderLocs.splice(inToInsert, 0, locations[i]);
					if(distances.length >= PLACES_LENGTH){
						max = distances[PLACES_LENGTH-1];
					}
				}
			}
			res.json({
				locations: orderLocs
			});

		});
}

function indexSmallest(distance, array){
	if(array.length == 0){
		return 0;
	}
	var i=0;
	for(; i< array.length; i++){
		if(distance < array[i]){
			return i;
		}
	}
	return i<PLACES_LENGTH ? i:-1;
}
function distance(coord1, coord2){
	var lat_diff = Math.pow(coord2.latitude - coord1.latitude, 2);
	var lon_diff = Math.pow(coord2.longitude - coord1.longitude, 2);
	return Math.sqrt(lat_diff + lon_diff);
}
