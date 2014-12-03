var mysql = require('mysql');

dbConnection = mysql.createConnection({
  host: process.env.CUSTOMCONNSTR_BARTENDRDB
  user: "bartendr",
  password: "bec331#W",
  database: "bartendr"
});
dbConnection.connect();
module.exports = dbConnection;