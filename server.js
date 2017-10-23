let express = require("express")
let app = express()

var JsonDB = require('node-json-db');
var db = new JsonDB("myDataBase", true, false);

//getMonth getDate

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req,res){
  console.log("Request~",req)
  res.send("success")
})
app.post("/checkin",function(req,res){

  if(req.body.text === "get"){
    res.send(db.getData("/"))
  }


  var date = new Date()
  var there = true;

  try {
    var data = db.getData(`/${date.getMonth()}/${date.getDate()}/${req.body.user_name}`);
    } catch(error) {
        there = false
    }

console.log(there)


  if(!there){
    db.push(`/${date.getMonth()}/${date.getDate()}`,req.body.user_name)
    res.send("Thanks for checking in!")
  }
  if(there) {
    res.send("You're already checked in for today!")
  }

})
app.listen(process.env.PORT)
