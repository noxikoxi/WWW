var createError = require('http-errors');
var express = require('express');
var router = express.Router();

const pokemonListService = require('../services/pokemonListService');
const pokedexService = require('../services/pokedexService');

router.get('/pokemons', pokemonListService.getPokemonList);

router.get('/', function(req, res, next) {
    res.render('pokedex', {title : "Pokedex"});

});

router.get('/:name',pokedexService.getPokedexInfo);

module.exports = router;
