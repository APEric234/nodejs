const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))
app.post("/submit-form", (req,res)=>{
  //the body stores form variables by there name

  const var1= req.body.username;
  res.render('postageform',{
    postage:req.body.postage
  });
})