let express = require("express")
let app = express()
var mysql = require('mysql');

var db = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req,res){
  console.log("Request~",req)
  res.send("Server-UP")
})
app.post("/checkin",function(req,res){
  console.log(req.body)
})
app.listen(process.env.PORT)
