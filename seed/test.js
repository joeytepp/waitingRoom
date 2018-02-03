var geocoder = require('google-geocoder');

var geo = geocoder({
  key: 'AIzaSyAqJwYpuhL7K7sVhjsSp8sfA3QMBd2bpCU'
});

geo.find("Athabasca Healthcare Center", function(err, res){
  if(!err){
    try{
      return res[0].GeoPlace.location.lat;
    }catch(e){
      console.log(res);
    }
  }
