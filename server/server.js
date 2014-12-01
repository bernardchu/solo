var express = require('express');
var db = require('./db');


// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
// var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set('port', 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// GET and POST functions
var toggleIngredient = function() {
  console.log('toggleIngredient called');
};

var getIngredients = function() {
  console.log('getIngredients called');
};

var getDrinks = function() {
  console.log('getDrinks called');
};
// Set up our routes
// app.use("/classes", router);
app.post('/ingredients', toggleIngredient);
app.get('/ingredients', getIngredients);
app.get('/drinks', getDrinks);

// Serve the client files
app.use(express.static(__dirname + "../../client"));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}
