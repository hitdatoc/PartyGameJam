var app = require('express')();
var http = require('http').Server(app);

http.listen(8888);

console.log("Listening on localhost:8888");
