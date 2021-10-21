var express = require('express');
var router = express.Router();


var mysql = require('mysql');
var con = mysql.createConnection({
  host: "database-1.chgp8y6tdnwl.ap-southeast-1.rds.amazonaws.com",
  user: "sa",
  password: "sapassword",
  database: "gym"
});

con.connect(function (err) {
  if (err) throw err;
  //Select only "name" and "address" from "customers":
  con.query("SELECT * FROM courses", function (err, result, fields) {
    if (err) throw err;
    /* GET home page. */
    router.get('/', function (req, res, next) {
      res.render('index',{data:result});
    });
  });
});




module.exports = router;
