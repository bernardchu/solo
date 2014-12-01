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
app.use('/ingredients', parser.urlencoded());
app.use('/drinks', parser.urlencoded());


// GET and POST functions
var toggleIngredient = function(req, res) {
  // console.log(req.body);
  for (var key in req.body) {
    var ing = key;
  }

  var toggleQueryString = "\
    UPDATE ingredients \
    SET in_stock = IF(in_stock=1, 0, 1) \
    WHERE name = ?;\
  ";

  db.query(toggleQueryString, [ing],function(err, results){
    if (err) {
      throw (err);
    }
    res.send(ing + ' updated.');
  });
};

var newIngredient = function(req, res) {
  for (var key in req.body) {
    var ing = key;
  }

  var queryString = "\
    INSERT INTO ingredients \
    (name, in_stock) \
    VALUES \
    (?, 0);"

  db.query(queryString, [ing], function(err, results){
    if (err) {
      res.send(ing + ' already exists.');
    } else {
      res.send(ing + ' added.');
    }
  });
};

var getIngredients = function(type, req, res) {
  if (type === 'all') {
    var where = ';';
  }
  if (type === 'stock') {
    var where = ' WHERE in_stock=1;'
  }
  var ingredientsQueryString = "SELECT name FROM ingredients" + where;
  db.query(ingredientsQueryString, function(err, results){
    if (err) {
      throw (err);
    }
    res.json(results);
  });
};

var getDrinks = function(req, res) {
  var drinksQueryString = " \
    select d.name from drinks d \
    left join \
    (select di.drink_id as did, count(*) as num_in_stock \
    from drink_ingredient di join ingredients i \
    on di.ingredient_id = i.id \
    join drinks d \
    on d.id = di.drink_id \
    where i.in_stock = 1 \
    group by drink_id) as nis \
    on nis.did = d.id \
    left join \
    (select d.id as drid, count(*) as num_ingredients \
    from drinks d join drink_ingredient di \
    on d.id = di.drink_id \
    group by d.id) as ni \
    on ni.drid = d.id \
    where ni.num_ingredients = nis.num_in_stock; \
  ";

  db.query(drinksQueryString, function(err, results){
    if (err) {
      throw (err);
    }
    res.json(results);
  });
};

var postDrink = function(req, res) {
  console.log(req.body);
  console.log(req.body.ingredients);
  console.log(req.body.instructions);
};

// Set up our routes
// app.use("/classes", router);
app.post('/ingredients', toggleIngredient);
app.post('/ingredients/new', newIngredient);
app.get('/ingredients/stock', function(req, res) {
  getIngredients('stock', req, res);
});
app.get('/ingredients/all', function(req, res) {
  getIngredients('all', req, res);
});
app.get('/drinks', getDrinks);
app.post('/drinks', postDrink);

// Serve the client files
app.use(express.static(__dirname + "../../client"));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}
