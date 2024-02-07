const databaseService = require('../services/databaseService');
const {loadInventory} = require('../services/usersService');
function generatePokemon(req, res, next)
{
    const randomNumber = Math.floor(Math.random() * 1025) + 1;
    try {
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
            .then(data => data.json())
            .then(async data => {
                res.render('inventory', Object.assign({}, await loadInventory(req), {
                    name: data.name[0].toUpperCase() + data.name.slice(1),
                    id: data.id,
                    img: data.sprites.front_default,
                    logged: true,
                    user: await req.user,
                    title: "Twoje Konto"
                }));
            })
    } catch{
        res.redirect('/users');
    }

}

async function addPokemon(req, res, next)
{
    const db = databaseService.openDatabase(false);
    const number = await req.query.id;

    const sql = "INSERT INTO Ekwipunek('idUzytkownika', 'idPokemona') values (?, ?);";
    const user = await req.user;
    const params = [user.id, number];

    db.run(sql, params, (err) => {
        if (err)
        {
            databaseService.closeConnection(db);
            throw err;
        }else{
            databaseService.closeConnection(db);
            res.redirect('/users');
        }
    })
}

module.exports = {
    generatePokemon,
    addPokemon
}