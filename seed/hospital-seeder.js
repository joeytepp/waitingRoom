var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var Hospital = require('../models/hospital');
var fs = require('fs');
var request = require('request');
var sleep = require("system-sleep");
var geocoder = require('google-geocoder');

var geo = geocoder({
  key: 'AIzaSyAqJwYpuhL7K7sVhjsSp8sfA3QMBd2bpCU'
});

console.log("Starting...");
fs.readFile('hospitalList.txt', 'utf8', function(err, data){
  if(err) throw err;
  //console.log(data);
  var list = data.split("\n");
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("hospitalData");
      for(var i=0; i<list.length; i++){
        var lt = getLat(list[i]);
        var lg = getLng(list[i]);
        //console.log(lt+ ", " + lg);
        dbo.collection("hospitals").insertOne(new Hospital({
        name: list[i],
        inLine: 0,
        onTheWay: 0,
        lat:lt, //getLat(list[i]),
        lng:lg //getLng(list[i])
      }), function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
      //getLat(list[i]);
    }

  });
});

var getLat = function(key){
  geo.find(key, function(err, res){
    if(!err){
      try{
        return res[0].GeoPlace.location.lat;
      }catch(e){
        console.log(res);
      }
    }
    // process response object

  });
}
  var getLng = function(key){
    geo.find(key, function(err, res){
      if(!err){
        try{
          return res[0].GeoPlace.location.lng;
        }catch(e){
          console.log(res);
        }
      }
      // process response object

    });
  }
  /*var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + key+"&key=AIzaSyAqJwYpuhL7K7sVhjsSp8sfA3QMBd2bpCU";
  console.log(url);
  request({
      url: url,
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
          var results = body.results;
          try{
            return results[0].geometry.location.lat;
          }catch(err){
            console.log("There was an error");
          }
          //console.log(body.results) // Print the json response
      }
  });
  return*/
