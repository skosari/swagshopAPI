var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
  title: String,
  price: Number,
  likes: {type: Number, default: 0}
});//this is our database table schema - what is in here is only what will be recorded in our db

module.exports = mongoose.model('Product', product);//We export 'Product' and use it in other sfchema files like wishlist.js
                                //mongo will lowercase it and add an s when you 'show collections'
//DataBase Query
//db.products.find()