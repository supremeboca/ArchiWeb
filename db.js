
var mysql = require("mysql")

var connection = mysql.createConnection({
    host    :'localhost',
    user    :'root',
    password:'Darkangel7',
    database:'archiweb'
});

connection.connect(function(error) {
    if (error) throw error;
});
module.exports = connection;
