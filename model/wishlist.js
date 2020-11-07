var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var wishList = new Schema({
  title: {type: String, default: "My Wish List"},
  //BELOW WE REFERENCE OUR product.js
  products:[{type: ObjectId, ref: 'Product'}]//Product was defined in our module.exports in product.js
});

module.exports = mongoose.model('WishList', wishList);

//WE COULD BUILD IT LIKE THIS AND NOT REFERENCE ANOTHER FILE BUT THIS IS NOT GOOD PRACTICE AND CAN LEAD TO BUGS
// var wishList = new Schema({
//   title: {type: String, default: "My Wish List"},
//   products:[{
//     title: String,
//     price: Number,
//     likes: Number
//   }]
// })
// https://docs.mongodb.com/manual/applications/data-models-relationships/