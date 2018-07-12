var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require("morgan");
var app = express();
var port = 8080;

var server = app.listen(port, function() {
    console.log("Server has Started on port " + port)
})

app.use(express.static('public'));
// Body-parser
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

var bambooRoutes = require("./routes")(app);

mongoose.connect("mongodb://localhost:27017/bamboo");
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
	console.log("Connected to mongod server");
});

// app.use('/index', bambooRoutes);

var enableRealTimeConnection = true;
