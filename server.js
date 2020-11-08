var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//Below is how we connect to the db
var db = mongoose.connect('mongodb://localhost/swagshop', {useNewUrlParser: true, useUnifiedTopology: true});

var Product = require('./model/product');
var WishList = require('./model/wishList');
const { request } = require('express');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/product', function(request, response){//The first post will create the db and post to it so we can "show dbs" and "use swagshop"
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

app.get('/product', function(req, res){
  Product.find({}, function(err, products){//The empty brackets will return all fields
    if(err){
      res.status(500).send({error: "We've got a problem hoss"});
    }else{
      res.send(products);
    }
  })
})



app.get('/wishlist', function(req,res){
  //We find all wishlist items and populate the product info from the id we linked in wishlist.js products:[{type: ObjectId, ref: 'Product'}]
  //In app.put we linked the id but were unable to get the product infor only the id # so to prevent needing to call the wishlist twice using the id we got from app.put we can use the populate function to return the product info - the giveaway is when our put only returns the id info
  WishList.find({}).populate({path:'products', model: 'Product'}).exec(function(err, wishlists){
    if(err){
      res.status(500).send({error:"Could not fetch wishlists"})
    }else{
      res.send(wishlists)
    }
  })
})

app.post('/wishlist', function(req, res) {
  var wishList = new WishList();
  wishList.title = req.body.title;

  wishList.save(function(err,savedWishList){
    if(err){
      res.status(500).send({error:"Houston we've got a problem"})
    }else{
      res.send(savedWishList)
    }
  })
})

app.put('/wishlist/product/add', function(req, res){
  Product.findOne(
    {_id: req.body.productId}, 
    function(err, product){
      if(err){
        res.status(500).send({error:"Could not add product to wishlist"})
      }else{
        WishList.update(
          {_id:req.body.wishListId},//in wishlist.js - products:[{type: ObjectId, ref: 'Product'}] 
          {$addToSet:{products: product._id}},//$addToSet is a func that adds our item to the set in this case we only want to add our product _id
          function(err){
            if(err){
              res.status(500).send({error:"Could not addToSet - product _id"})
            }else{
              res.send("Successfully added to wishlist")
            }
          }
        )
      }
    }
  )
})//IN POSTMAN {"productId":"paste product id", "wishListId":"paste wishlist id"}


app.listen(3001, function() {
  console.log("Swag shop is running on port 3001...")
});
