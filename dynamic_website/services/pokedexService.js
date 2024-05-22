const getPokedexInfo = (req, res, next) => {
    try {
        fetch(`https://pokeapi.co/api/v2/pokemon/${req.params.name}/`)
            .then(result => {
                if (!result.ok) {
                    res.render('pokedex', {title: "Pokedex", mess: "Brak pokemona w bazie"});
                }else{
                    return result.json().then(async data => {
                        // Abilities Descriptions
                        let abilitiesDesc = [];
                        for (const entry of data.abilities) {
                            const txt =  await getAbilityDescription(entry.ability.name);
                            abilitiesDesc.push(txt);
                        }

                        // Evolution
                        const evolutions = await getEvolutions(data.name);

                        return Object.assign({}, evolutions, data, {abilitiesDesc: abilitiesDesc})
                    }).then(data => {
                        res.render('pokemonInfo', {
                            title: data.name[0].toUpperCase() + data.name.slice(1),
                            types: data.types,
                            spriteUrl: data.sprites,
                            stats: data.stats,
                            id: data.id,
                            abilities: data.abilities,
                            abilitiesDesc: data.abilitiesDesc,
                            evolutionImages: data.evolutionImages,
                            evolutionNames: data.evolutionNames,
                            weight: data.weight,
                            height: data.height
                        });
                    })
                }

            })

    } catch (error) {
        console.error("Bład Synchornizacji");
    }


}

const getEvolutions = (name) => {
    try{
        return new Promise( (resolve, reject) => {
            fetch("https://pokeapi.co/api/v2/pokemon-species/" + name)
                .then( res => res.json())
                .then(res => fetch(res.evolution_chain.url))
                .then(res => res.json())
                .then( (res) => {
                    let chainSpecies = res.chain;

                    while(chainSpecies.species.name !== name )
                    {
                        chainSpecies = chainSpecies.evolves_to[0];
                    }

                    return chainSpecies.evolves_to;
                })
                .then(async chain => {
                    let evolNum = chain.length;
                    let evolutionNames = []
                    let evolutionImages = []

                    for (let i=0; i < evolNum; ++i) {
                        evolutionNames.push(chain[i].species.name)
                        await fetch('https://pokeapi.co/api/v2/pokemon/' + chain[i].species.name)
                            .then(res => res.json())
                            .then(res => {
                                evolutionImages.push(res.sprites.front_default);
                            })
                    }
                    resolve({evolutionNames: evolutionNames, evolutionImages: evolutionImages})
                })
        })

    }catch (error){
        return {evolutionNames: [], evolutionImages: []};
    }

}

const getAbilityDescription = (abilityName) => {
    try{
        return new Promise((resolve, reject) => {
        fetch("https://pokeapi.co/api/v2/ability/" + abilityName)
            .then(res => res.json())
            .then(res => {
                res.effect_entries.forEach(effect => {
                    if (effect.language.name === "en")
                    {
                        resolve(effect.effect);
                    }
                })
            })
        })
    }catch (error){
        return "";
    }
}

module.exports = {
    getPokedexInfo
}