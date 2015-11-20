var mongoose = require('mongoose'),
	crypto = require('crypto'),
	User = require('../models/User'), //mongoose.model("User"),
	UserLogin = require('../models/UserLogin'), //mongoose.model("User"),
	ObjectId = mongoose.Types.ObjectId;

exports.registerUser = function(req, res, next){
	var userModel = new User(req.body);
	userModel.save(function(err, user){
		if(err){
			res.status("500");
			res.json({
				response_status: "error",
				response_message: "Error to register User: " + err
			});
		}
		else{
			res.json({
				response_status: "success",
				response_message: user
			});
		}
	});
}

exports.loginUser = function(req, res, next){
	var loginModel = new UserLogin(req.body);
	console.log("MODEL OF LOGIN :: " + loginModel);
	if(loginModel.email==null){
		res.status(400);
		res.json({
			response_status:"error",
			response_message: "Request body is not valid"
		});
	}
	User.findOne({'email':loginModel.email, 'password':loginModel.password}).exec(
		function(err, user){
			if(err || user == null){
				res.status(500);
				res.json({
					response_status:"error",
					response_message: "Error on login: " + err
				});
			}
			else{
				user.token = crypto.randomBytes(48).toString('hex');
				user.save(function(error){
					if(error){
						user.token = null;
						console.error(error);
					}
				});
				res.json({
					response_status: "success",
					response_message: user,
					token: user.token
				});
			}
		});

}

exports.logoutUser = function(req, res, next){
	User.findOne({'token':req.token}).exec(
		function(err, user){
			if(err || user == null){
				res.status(500);
				res.json({
					response_status:"error",
					response_message: "Error on authentication: " + err
				});
			}
			else{
				user.token = null;
				user.save(function(error, user){
					if(error){
						console.error("Error on logout: "+ error);
						res.status(500);
					}
					else{
						res.json({
							response_status: "success",
							response_message: "User has been logged out"
						});
					}
				});
			}
		});

}