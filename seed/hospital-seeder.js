var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var Hospital = require('../models/hospital');
var fs = require('fs');

var testHospital = new Hospital({
  name: 'Hospital',
  inLine: 0,
  onTheWay: 0
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
        dbo.collection("hospitals").insertOne(new Hospital({
        name: list[i],
        inLine: 0,
        onTheWay: 0
      }), function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    }

  });
});
