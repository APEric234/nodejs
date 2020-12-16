var express = require('express');
const {
  Client
} = require('pg');



var router = express.Router();

function calculatePostage(weight, type) {
  
}
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
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

  client.query('select * from monsters;', (err, res1) => {
    var names=[];
    var id=[];
    if (err) throw err;
    for (let row of res1.rows) {
      console.log(JSON.stringify(row));
      names.push(row["name"]);
      id.push(row["id"]);
    }
    
    res.render('heros', {
    heros: names,
    ids:id
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
      names.push(row["name"]);
    }
    
    res.render('monsters', {
    monsters: names
    });
  });
});
module.exports = router;