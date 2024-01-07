var createError = require('http-errors');
var express = require('express');
var router = express.Router();

/* GET pokedex listing. */

router.get('/pokemons', async function(req, res, next) {
    try{
        const genNum = await req.query.generation;
        console.log(genNum);
        const response = await fetch('https://pokeapi.co/api/v2/generation/' + genNum);

        console.log(response);
        const data = await response.json();

        let pokemonList = await data.pokemon_species;

        pokemonList.forEach(pokemon => {
            pokemon.url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.url.split("/")[6] + ".png";
        })

        await res.render('pokemons', {title : "Lista Pokemonów", pokemony: pokemonList, region: data.main_region.name});
    }catch (error){
        // render the error page
        console.error("Bład pobierania danych:", error);
        next(createError(404));

    }
});

router.get('/', function(req, res, next) {
    res.render('pokedex', {title : "Pokedex"});

});

router.get('/:name', async function(req, res, next) {
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${req.params.name}/`);
        let data = await response.json();
        await res.render('pokemonInfo', {
            title : data.name[0].toUpperCase() + data.name.slice(1),
            types : data.types,
            spriteUrl :data.sprites,
            stats : data.stats,
            id : data.id,
            abilities : data.abilities,
            weight : data.weight,
            height : data.height
        })
    }
    catch (error){
        // render the error page
        console.error("Bład pobierania danych:", error);
        res.render('pokedex',{title : "Pokedex", mess : "Brak Takiego pokemona"});
    }
});









module.exports = router;
