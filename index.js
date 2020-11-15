const express = require('express');
const path = require('path');
const app = express();
app.get('/', function(req, res){
  res.render('pages/index.ejs');
});

app.get('/rentingForm', function(req, res) {
  res.sendFile("./index.html");
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.post("/submit-form", (req,res)=>{
  //the body stores form variables by there name

  const var1= req.body.username;
  res.render('postageform',{
    postage:req.body.postage
  });
});