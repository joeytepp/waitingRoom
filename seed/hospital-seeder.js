var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var Hospital = require('../models/hospital');
var fs = require('fs');
var request = require('request');
var sleep = require("system-sleep");
var geocoder = require('google-geocoder');
var longitudes =[];
var lattitudes = [];
var geo = geocoder({
  key: 'AIzaSyCamXAiqu6dCyzYqJbYoe8BKKzkwCFZrfo'
});

console.log("Starting...");
fs.readFile('hospitalList.txt', 'utf8', function(err, data){
  if(err) throw err;
  var aList = data.split("\r\n")
  console.log(aList.length);

  for(var i = 0; i<aList.length; i++){
  //    console.log(i, aList[i]);
      var hospital = aList[i];
    geo.find(hospital, (function(h) { return function(err, res) {
      console.log(h, res);
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
          var dbo = db.db("hospitalData");
            //console.log(lt+ ", " + lg);
            //console.log(longitudes[i]+","+lattitudes[i]);
            try{
            dbo.collection("hospitals").insertOne(new Hospital({
            name: h,
            inLine: 0,
            onTheWay: 0,
            lat:res[0].location.lat, //getLat(list[i]),
            lng:res[0].location.lng, //getLng(list[i])
            address:res[0].formatted_address
          }), function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
          });
        }catch(e){console.log(h,i)}
          //getLat(list[i]);

      });
    }; })(hospital))
  }

});


/*fs.readFile('hospitalList.txt', 'utf8', function(err, data){
  if(err) throw err;
  //console.log(data);
  var list = data.split("\n");
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("hospitalData");
      for(var i=0; i<list.length; i++){
        //console.log(lt+ ", " + lg);
        //console.log(longitudes[i]+","+lattitudes[i]);
        dbo.collection("hospitals").insertOne(new Hospital({
        name: list[i],
        inLine: 0,
        onTheWay: 0,
        lat:lattitudes[i], //getLat(list[i]),
        lng:longitudes[i] //getLng(list[i])
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
        return res[0].location.lat;
      }catch(e){
        console.log(res);
        return null;
      }
    }
    // process response object

  });
}
  var getLng = function(key){
    geo.find(key, function(err, res){
      console.log(res);
      if(!err){
        try{
          return res[0].location.lng;
        }catch(e){
          console.log(res);
          return null;
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
