var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/rentingForm', function(req, res){
  // var from = req.body.from;
  // var to = req.body.to;
 
  res.render('rentingForm', {
     from:req.body.from,
     to:  req.body.to
  });
});
module.exports = router;
