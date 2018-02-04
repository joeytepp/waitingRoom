var url = "mongodb://localhost:27017/";
var fs = require("fs");

/*fs.readFile('data.json', 'utf8', function(err, data){
  console.log(data.length);
  var dict = JSON.parse(data.length);
  MongoClient.connect(
    encodeURIComponent("mongodb://waiting-room:nyOTK2ru0Xddf2tKXGvKIAZomMBftyXis1TPkd2E59iQAhILcHVwxLXkiMIS4C0DDhZUQp2B8E8afDzrBLzjGQ==@waiting-room.documents.azure.com:10255/?ssl=true"),
  {auth: {
    user: 'waiting-room',
    password: '3I1puKdirMmiugduPiim8FXAb6IBgmVPB4TwZGMZCpjMtjt3vLKg8TKuwhWvOzJa4ngV1MBzlz8ur8LM5NU1RA==',
  }}, function(err, db){
    if(err) throw err;
    var dbo = db.db("hospitalData");

    db.close();
  });
});*/
var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://waiting-room:3I1puKdirMmiugduPiim8FXAb6IBgmVPB4TwZGMZCpjMtjt3vLKg8TKuwhWvOzJa4ngV1MBzlz8ur8LM5NU1RA==@waiting-room.documents.azure.com:10255/?ssl=true",
{auth:{
  user:'waiting-room',
  password:'3I1puKdirMmiugduPiim8FXAb6IBgmVPB4TwZGMZCpjMtjt3vLKg8TKuwhWvOzJa4ngV1MBzlz8ur8LM5NU1RA=='
}}
,function (err, db) {
  var dbo = db.db("hospitalData");
  db.close();
});
  /*MongoClient.connect("mongodb://waiting-room:nyOTK2ru0Xddf2tKXGvKIAZomMBftyXis1TPkd2E59iQAhILcHVwxLXkiMIS4C0DDhZUQp2B8E8afDzrBLzjGQ==@waiting-room.documents.azure.com:10255/?ssl=true", auth: {user: 'waiting-room', password: 'nyOTK2ru0Xddf2tKXGvKIAZomMBftyXis1TPkd2E59iQAhILcHVwxLXkiMIS4C0DDhZUQp2B8E8afDzrBLzjGQ==',}, function (err, db)  {
    if(err){
      console.log(err);
      throw err;
    }
    var dbo = db.db("hospitalData");
    dbo.collection("hospitals").insertMany(dict, function(err, res){
      if(err) throw err;
      console.log("Number of documents inserted:" + res.insertedCount);
      db.close();
    });
  });
});*/
