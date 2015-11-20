var restify = require('restify');
var fs = require('fs');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/eav'); // connect to our database


var controllers = {};
var root_path = process.cwd();
var controllers_path = root_path + "/app/controllers";

console.log("Controllers path " + controllers_path);

fs.readdirSync(controllers_path).forEach(function(file){
	if(file.indexOf('.js')!=-1){
		console.log("Adding controller " + file );
		controllers[file.split('.')[0]] = require(controllers_path + "/" + file);
	}
});



var ip_address = '127.0.0.1';
var port = '8080';

var server = restify.createServer({
	name: "eav"
});

server.use(restify.queryParser());
server.use(restify.bodyParser());

//ROUTES
server.post("/users/register",  controllers.user.registerUser);
server.post("/users/login", controllers.user.loginUser);
server.post("/users/logout", controllers.app.authenticateRequest, controllers.user.logoutUser);


server.listen(port, ip_address, function(){

});