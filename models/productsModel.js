var mongoose = require('mongoose');

var productsSchema = mongoose.Schema({
	'discount' : Number,
	'name' : String,
	'photo' : String,
	'price' : Number,
	'region' : String
});

module.exports = mongoose.model('Products', productsSchema);
