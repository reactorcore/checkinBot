let express = require("express")
let app = express()

app.get("/",function(req,res){
  console.log("Request~",req)
  res.send("success")
})
app.post("/checkin",function(req,res){
  console.log(req.data)  
  res.send("JSON.stringify(req)")
})
app.listen(process.env.PORT)
