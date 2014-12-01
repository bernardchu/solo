var mysql = require('mysql');

dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});
dbConnection.connect();
module.exports = dbConnection;