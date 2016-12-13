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

http.listen(8888);

console.log("Listening on localhost:8888");
