var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    inLine: {type: String, required: true},
    onTheWay: {type: Number, required: true}
});

module.exports = mongoose.model('Product', schema);
