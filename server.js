let express = require("express")
let app = express()

app.get("/",function(req,res){
  console.log("Request~",req)
  res.send("success")
})
app.post("/checkin",function(req,res){
  console.log(req.data)
  let a = JSON.stringify(req)
  res.send(a)
})
app.listen(process.env.PORT)
