let express = require("express")
let app = express()

app.get("/",function(req,res){
  console.log("Request~",req)
  res.send("success")
})
app.post("/checkin",function(req,res){
  console.log(req.data)
  let a = req.toString()
  res.send(a)
})
app.listen(process.env.PORT)
