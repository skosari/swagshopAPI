var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
  title: String,
  price: Number,
  likes: Number
});//this is our database table schema - what is in here is only what will be recorded in our db

module.exports = mongoose.model('Product', product);//We export 'Product' and use it in other sfchema files like wishlist.js

//DataBase Query
//db.products.find()