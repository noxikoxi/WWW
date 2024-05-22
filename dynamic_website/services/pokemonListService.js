const createError = require("http-errors");
const getPokemonList = async (req, res, next) => {
    try{
        const genNum = req.query.generation;
        const response = await ( fetch('https://pokeapi.co/api/v2/generation/' + genNum));

        if (!response.ok)
        {
            throw new Error(`HTTP ERROR STATUS: ${response.status}`);
        }

        const data = await response.json();

        const pokemonList = data.pokemon_species;

        pokemonList.forEach(pokemon => {
            pokemon.url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.url.split("/")[6] + ".png";
        })

        res.render('pokemons', {title : "Lista Pokemonów", pokemony: pokemonList, region: data.main_region.name[0].toUpperCase() + data.main_region.name.slice(1)});
    }catch (error){
        // render the error page
        console.error("Bład pobierania danych:", error);
        next(createError(404));

    }
}

module.exports = {
    getPokemonList
}