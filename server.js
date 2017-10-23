let express = require("express")
let app = express()

app.get("/",function(req,res){
  console.log(req)
})

app.listen( process.env.PORT  )
