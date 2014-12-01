var mysql = require('mysql');

dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "bartendr"
});
dbConnection.connect();
module.exports = dbConnection;