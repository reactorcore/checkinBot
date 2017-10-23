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
  var date = new Date()


  try {
    var data = db.getData(`${date.getMonth()}/${date.getDate()}/${req.body.user_name}`);
    } catch(error) {
      if(error){
        db.push(`${date.getMonth()}/${date.getDate()}`,req.body.user_name)
           res.send("Thanks for checking in!")
    } else {
      res.send("You're already checked in for today!")
    }
  }



  // if(!db.getData(`${date.getMonth()}/${date.getDate()}/${req.body.user_name}`)){
  //   db.push(`${date.getMonth()}/${date.getDate()}`,req.body.user_name)
  //   res.send("Thanks for checking in!")
  // } else {
  //   res.send("You're already checked in for today!")
  // }

})
app.listen(process.env.PORT)
