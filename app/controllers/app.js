var mongoose = require('mongoose'),
	User = require('../models/User'),
	ObjectId = mongoose.Types.ObjectId;

exports.authenticateRequest = function(req, res, next){
	var auth_token = req.headers["authentication"];
	var uid = req.headers["user"];

	if (typeof auth_token !== 'undefined' && typeof uid !== 'undefined' ) {
        User.findOne({'_id':new ObjectId(uid), 'token':auth_token}).exec(
        	function(err, user){
        		if(err){
        			res.send(500);
        		}
        		else if(user && typeof user.token != 'undefined'){
        			req.token = auth_token;
			        next();
        		}
        		else{
        			res.send(401);
        		}
        	});


    } else {
        res.send(401);
    }
}