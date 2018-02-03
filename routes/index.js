var express = require('express');
var router = express.Router();
var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WaitingRoom' });



});

router.post('/click', function(req, res) {
  var test = req.body.test


  var url = "http://maps.googleapis.com/maps/api/geocode/json?address=hospital " + test;
  console.log("url = "+url);

  request({
      url: url,
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
          var results = body.results;
          for(var i in results){
            console.log(i);
          }
          //console.log(body.results) // Print the json response
      }
  });
  console.log(test);

  res.send(test);
});



module.exports = router;
