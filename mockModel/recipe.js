var mongoose = require('mongoose');
const { model } = require('../model/product');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;


var recipe = new Schema({
   title: String,

   ingredients:[{type: ObjectId, ref: 'Ingredient'}]
});

module.exports = (mongoose.model('Recipe', recipe))