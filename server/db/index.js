var mysql = require('mysql');

dbConnection = mysql.createConnection({
  user: "bartendr",
  password: "bec331#W",
  database: "bartendr"
});
dbConnection.connect();
module.exports = dbConnection;