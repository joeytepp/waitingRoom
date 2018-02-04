var geocoder = require('google-geocoder');

var geo = geocoder({
  key: 'AIzaSyAqJwYpuhL7K7sVhjsSp8sfA3QMBd2bpCU'
});

geo.find("Athabasca Healthcare Center", function(err, res){
  if(!err){
    console.log(res);
  }else{
    console.log(err);
  }
});
