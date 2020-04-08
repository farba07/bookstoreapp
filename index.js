
var http = require('http');

var express = require('express');

var app = express();

var path = require('path');

var server = require('http').createServer(app);

var io = require('./.');

var port = process.env.PORT || 8500


var url = require("url");

var fs = require('fs');


var MongoClient = require('mongodb').MongoClient;

server.listen(port, function(){
	console.log('Server at 8500');
});

//
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){

	var page = url.parse(req.url).pathname;

	res.writeHead(200, {"Content-type": "text/html"});

	if(page=='/'){
		fs.readFile('./public/index.html' , 'utf-8' , function(error, data){
			res.write(data);
		});	
	}
	else if(page=='/livres'){
		fs.readFile('./public/livres.html' , 'utf-8' , function(error, data){
			res.write(data);
		});	
	}
	else if(page=='/auteurs'){
		fs.readFile('./public/auteur.html' , 'utf-8' , function(error, data){
			res.write(data);
		});	
	}

	else if(page=='/graphe'){
		fs.readFile('./public/graphe.html' , 'utf-8' , function(error, data){
			res.write(data);
		});	
	}	

	socket.on('livres' , function(){
		alert("oui");
	});
});	


//var url = "mongodb://localhost:27017/bookStore";

//	console.log(page);
