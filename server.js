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

app.get('/Alien.png', function(request, response){
	response.sendFile(__dirname + '/Alien.png');
});

app.get('/PartyHuman.png', function(request, response){
	response.sendFile(__dirname + '/PartyHuman.png');
});

app.get('/Floor1.png', function(request, response){
	response.sendFile(__dirname + '/Floor1.png');
});

app.get('/tempUpgradeWindow.png', function(request, response){
	response.sendFile(__dirname + '/tempUpgradeWindow.png');
});

app.get('/tempUpgradeTab.png', function(request, response){
	response.sendFile(__dirname + '/tempUpgradeTab.png');
});

http.listen(8888);

console.log("Listening on localhost:8888");
