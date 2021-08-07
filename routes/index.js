var express = require('express');
const {
  Client
} = require('pg');
const { get } = require('./users');


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
var router = express.Router();

function calculatePostage(weight, type) {
  
}
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });

});
router.post('/battle', function (req, res) {
  // var from = req.body.from;
  // var to = req.body.to;
    var hero = getCookie("hero");
    var message="";
    var cookie="";
    var id = getCookie("monster");
    var date= new Date();
    date.setTime(date.getTime() + 2*24*60*60*1000);
    if(monster && hero){
      if(monster>hero){
        message = "Sorry you have perished try again";
       cookie = "monster";
       id=monster;
      }else{
        message = "You Defeated the monster!";
        cookie = "hero";
        id=hero;

      }
    }
 
    
    res.render('battle', {
    messages: message,
    type:cookie,
    val:id
    });
  });
router.post('/heros', function (req, res) {
  // var from = req.body.from;
  // var to = req.body.to;
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  client.connect();

  client.query('select * from heros;', (err, res1) => {
    var names=[];
    var id=[];
    if (err) throw err;
    for (let row of res1.rows) {
      console.log(JSON.stringify(row));
      names.push(row["name"]+"&"+row["h_id"]);
    }
    
    res.render('heros', {
    heros: names,
    });
  });
});
router.post('/monsters', function (req, res) {
  // var from = req.body.from;
  // var to = req.body.to;
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  client.connect();

  client.query('select * from monsters;', (err, res1) => {
    var names=[];
    if (err) throw err;
    for (let row of res1.rows) {
      console.log(JSON.stringify(row));
      names.push(row["name"]+"&" + row["m_key"]);
    }
    
    res.render('monsters', {
    monsters: names
    });
  });
});
module.exports = router;