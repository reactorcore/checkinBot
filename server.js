let express = require("express")
let app = express()
var mysql = require('mysql');

var db = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD
});
setTimeout(
db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + db.threadId);
});
, 3000)

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req,res){
  console.log("Request~",req)
  res.send("Server-UP")
})
app.post("/checkin",function(req,res){

  //user_name
  //team_domain
  // moment().format('L'); // 01/14/2013

  console.log(req.body)
})
app.listen(process.env.PORT)
