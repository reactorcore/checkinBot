let express = require("express")
let app = express()
var mysql = require('mysql');


var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD
  }
});


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

  knex('Checkins').insert({
    userName: req.body.user_name,
    className: req.body.team_domain,
    dateCheckedIn: moment().format('L')
  })

  console.log(req.body)
})
app.listen(process.env.PORT)
