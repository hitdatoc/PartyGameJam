var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(request, response){
	response.sendFile(__dirname + '/index.html');
});

app.get('/main.js', function(request, response){
	response.sendFile(__dirname + '/main.js');
});

app.get('/phaser.min.js', function(request, response){
	response.sendFile(__dirname + '/phaser.min.js');
});

app.get('/tempClicker.png', function(request, response){
	response.sendFile(__dirname + '/tempClicker.png');
});

app.get('/beerClicker.png', function(request, response){
	response.sendFile(__dirname + '/beerClicker.png');
});

app.get('/digital_dot.png', function(request, response){
	response.sendFile(__dirname + '/digital_dot.png');
});

app.get('/digital_dot.fnt', function(request, response){
	response.sendFile(__dirname + '/digital_dot.fnt');
});

http.listen(8888);

console.log("Listening on localhost:8888");
