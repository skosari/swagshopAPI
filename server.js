var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swagshop', {useNewUrlParser: true, useUnifiedTopology: true});

var Product = require('./model/product');
var WishList = require('./model/wishList');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(3001, function() {
  console.log("Swag shop is running on port 3001...")
});
