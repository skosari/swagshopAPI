var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const { response } = require('express');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var db = mongoose.connect('mongodb://localhost/recipeapp', {useNewUrlParser: true, useUnifiedTopology: true} );

var Ingredient = require('./mockModel/ingredient');
var Recipe = require('./mockModel/recipe');

app.post('/ingredient', function(req, res){
    var ingredient = new Ingredient();
    ingredient.title = req.body.title;
    ingredient.brand = req.body.brand;
    ingredient.amount - req.body.amount;

    ingredient.save(function(err, savedIngredient) {
        if(err){
            res.status(500).send({error: 'format incorrect'})
        }else{
            res.send(savedIngredient)
        }
    })
})

app.post('/recipe', function(req,res){
    var recipe = new Recipe();
    recipe.title = req.body.title;

    recipe.save(function(err, savedRecipe){
        if(err){
            res.status(500).send({error: 'Your format is inccorrect'})
        }else{
            res.send(savedRecipe)
        }
    })
})


app.listen(3046, function() {
    console.log('mockServer is working');
})