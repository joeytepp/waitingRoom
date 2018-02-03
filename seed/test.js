var geocoder = require('geocoder');
geocoder.geocode("Athabasca Healthcare Center", function ( err, data ) {
  // do something with data
  if(!err){
      console.log(data.results[0].geometry.location.lat);
    }
});
