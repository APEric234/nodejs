var express = require('express');
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();
function getMonsteres(){
client.query('SELECT * FROM monsters;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
}
var router = express.Router();
function calculatePostage(weight,type){
  //based off zone 1
if(type=="FCSR"){
  if(weight>12){
    return 5.9;
  }else if (weight>8){
    return 5.3;
  }else if (weight>4){
    return 4.6
}else{
  return 3.8;

}
}else if(type=="letterS"){
  if(weight>3){
    return 1;
  }else if (weight>2){
    return .85;
  }else if (weight>=1){
    return .7;
  }else{
  return .55;

}
}else if(type=="letterM"){
  if(weight>3){
    return .95;
  }else if (weight>2){
    return .8;
  }else if (weight>=1){
    return .65;
  }else{
  return .5;
}
}
else {
  var baseprice=1;
  var increment=.2;
  var ozx=Math.ceil(weight)-1;
  return baseprice+(ozx*increment);

}
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/postageForm', function(req, res){
  // var from = req.body.from;
  // var to = req.body.to;
  var names = {
    "FCSR":"PACKAGE",
    "letterS":"Letters Stamped",
    "letterM":"Letters Metered",
    "envelope":"Envelope"
  }
  var priceIn=calculatePostage(req.body.weight,req.body.type);
  res.render('postageForm', {
     type:names[req.body.type],
     weight:  req.body.weight,
     price:priceIn
  });
});
module.exports = router;
