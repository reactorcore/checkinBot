let express = require("express")
let app = express()

app.get("/",function(req,res){
  console.log("Request~",req)
  res.send("success")
})
app.post("/checkin",function(req,res){
  console.log(req.body)
  console.log(req.text)
  console.log(req.data)
  console.log(req.token)

  res.send("K")
})
app.listen(process.env.PORT)
