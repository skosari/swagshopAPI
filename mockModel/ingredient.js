var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ingredient = new Schema({
    title: String,
    brand: String,
    amount: Number,
    rating: {type: Number, default: 0}
})

module.exports = mongoose.model('Ingredient', ingredient);