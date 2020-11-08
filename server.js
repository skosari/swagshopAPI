var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//Below is how we connect to the db
var db = mongoose.connect('mongodb://localhost/swagshop', {useNewUrlParser: true, useUnifiedTopology: true});

var Product = require('./model/product');
var WishList = require('./model/wishList');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/product', function(request, response){
  var product = new Product();
  product.title = request.body.title;
  product.price = request.body.price;
  //product.likes has a default value so no need to issue it here but logically it would start at 0 likes since we are creating a new product
  product.save(function(err, savedProduct) {
    if(err){
      response.status(500).send({error:"You have a basic error comment that we will spruce up later"})
    } else {
      response.send(savedProduct)//return savedProduct to replace the data the client just entered with the confirmed saved data
      //response.status(200).send(savedProduct) THIS IS THE SAME AS ABOVE SINCE omitting STATUS(200) is shorthand
    }
  })
});
//or if the data is coming in correctly through the body
// app.post('/product', function(req,res) {
//   var product = new Product(req.body);
// });
// //ALT to first way
// app.post('/product' function(req, res) {
//   var product = new Product({title: res.body.title, price: res.body.price});
// })

app.post('/wishlist', function(req, res) {
  var wishListItem = new WishList(req.body);
})

app.listen(3001, function() {
  console.log("Swag shop is running on port 3001...")
});
