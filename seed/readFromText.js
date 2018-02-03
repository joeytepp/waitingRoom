console.log("Starting...");
var fs = require('fs');
var array = [];
fs.readFile('hospitalList.txt', 'utf8', function(err, data){
  if(err) throw err;
  //console.log(data);
  list = data.split("\n");
  for(var i in list){
    array.push(i);
  }
});
console.log(array.length);
