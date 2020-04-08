
var http = require('http');

var express = require('express');

var app = express();

var path = require('path');

var server = require('http').createServer(app);

var io = require('socket.io')(server);

var port = process.env.PORT || 8500

var url = require("url");

var fs = require('fs');

var MongoClient = require('mongodb').MongoClient;

var mongourl = "mongodb://localhost:27017/bookStore";

server.listen(port, function(){
	console.log('Server at 8500');
});

app.use(express.static(path.join(__dirname, 'public')));

app.head('/' ,function(req, res){
	fs.readFile('./public/index.html' , 'utf-8' , function(error, data){
		res.write(data);
	});	
});
app.head('/livres', function(req, res){
	fs.readFile('./public/livres.html' , 'utf-8' , function(error, data){
		res.write(data);
	});	
});
app.head('/auteurs', function(req, res){
	fs.readFile('./public/auteur.html' , 'utf-8' , function(error, data){
		res.write(data);
	});
});
app.head('/graphe', function(req, res){
	fs.readFile('./public/graphe.html' , 'utf-8' , function(error, data){
		res.write(data);
	});
});
io.on('connection', function(socket){
	console.log('connecté');
	socket.on('liv', function(){
		MongoClient.connect(mongourl, function(error, db) {
            if (error) throw error;
            var dbo = db.db("bookStore");
            console.log("connecté à la base!");
        	dbo.collection("books").find({}, { 
				projection: { 
					_id: 0, 
					title: 1
				} 
			}).toArray(function(err, result) {
				if (err) throw err;
				socket.emit('respliv' , result);
			});
		});
		
	});

	socket.on('auth', function(){
		MongoClient.connect(mongourl, function(error, db) {
            if (error) throw error;
            var dbo = db.db("bookStore");
            console.log("connecté à la base!");
        	dbo.collection("books").find({}, { 
				projection: { 
					_id: 0, 
					authors: 1
				} 
			}).toArray(function(err, result) {
				if (err) throw err;
				socket.emit('respauth' , result);
			});
		});
	});

	socket.on('graph', function(){
		MongoClient.connect(mongourl, function(error, db) {
            if (error) throw error;
            var dbo = db.db("bookStore");
            console.log("connecté à la base!");
        	dbo.collection("books").find({}, { 
				projection: { 
					_id: 0, 
					authors: 1,
					title:1,
					isbn:1,
					pagecount : 1,
					categories:1
				} 
			}).toArray(function(err, result) {
				if (err) throw err;
				socket.emit('respgraph' , result);
			});
		});
	});
});	