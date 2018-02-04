var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    inLine: {type: Number, required: true},
    onTheWay: {type: Number, required: true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    address: {type: String, required: true}
});

module.exports = mongoose.model('Product', schema);
