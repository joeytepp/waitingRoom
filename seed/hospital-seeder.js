var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var Hospital = require('../models/hospital');

var testHospital = new Hospital({
  name: 'Hospital',
  inLine: 0,
  onTheWay: 0
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("hospitalData");
  dbo.collection("hospitals").insertOne(testHospital, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
