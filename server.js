let express = require("express")
let app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req,res){
  console.log("Request~",req)
  res.send("success")
})
app.post("/checkin",function(req,res){
  console.log(req.body.text)
  console.log(req.text)
  console.log(req.data)
  console.log(req.token)

  res.send("K")
})
app.listen(process.env.PORT)
