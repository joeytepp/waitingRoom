var express = require('express');
var router = express.Router();
var request = require('request');
var geocoder = require('google-geocoder');
var geo = geocoder({
  key: 'AIzaSyBiJKNdm1r_N0HUAo9YLvbNNirrHJh9DuQ'
});
var geodist = require('geodist')

/* GET home page. */
var MongoClient = require('mongodb').MongoClient;



  router.get('/', function(req, res, next) {
    res.render('index', { title: 'WaitingRoom' });



  });

  router.post('/click', function(req, res) {
    var test = req.body.test
    var lat, lng;
    var results = [];
    geo.find(test, function(err, res){
      if(!err) {
        console.log(res[0]);
        try{
          lat = res[0].location.lat;
          lng = res[0].location.lng;
        }catch(e){
          lat = null;
          lng = null;
        }
      }
    });

    MongoClient.connect("mongodb://localhost:27017/hospitalData", function(err, db) {

      var dbo = db.db("hospitalData");
      dbo.collection("hospitals").find({}).toArray(function(err, result){
        if(err) throw err;
        try{
        console.log(result[0].name);
        //res.send(JSON.stringify(result[0]));
        }catch(e){}

        if(lat!=null & lng!=null){
          for(var i = 0; i<result.length; i++){
            var dist = geodist({lat: result[i].lat, lon: result[i].lng}, {lat: lat, lon: lng});
            //console.log(dist);
            results.push({
              hospital: result[i],
              distance: dist

            });
          }
          res.send(
            JSON.stringify(
              results.sort(function(a, b){
                return a.distance - b.distance;
              })[0].hospital));

        }

        db.close();
      });
    });
    /*request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var results = body.results;
            console.log(results);
            //console.log(body.results) // Print the json response
        }
    });*/

    console.log(test);


  });



  module.exports = router;
