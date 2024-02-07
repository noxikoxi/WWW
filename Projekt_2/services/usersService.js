var bcrypt = require('bcrypt');
var databaseService = require("./databaseService");
async function register(req, res, next) {

    const db = databaseService.openDatabase(false);

    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const sql = "INSERT INTO Uzytkownicy('nazwa', 'email', 'haslo', 'rola') " +
            "values (?, ?, ?, 'Uzytkownik');"

        const params = [req.body.username, req.body.email, hashedPassword]

        db.run(sql, params, function (err) {
            if (err){
                throw err;
            }else{
                res.render('succesfulRegister');
            }
        });
    }catch(error){
        res.redirect('/users/register');
        console.log(error.message);
    }finally {
        databaseService.closeConnection(db);
    }

}

function checkAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }

    res.redirect('/users');
}

function checkNotAuthenticated(req, res, next){
    if (req.isAuthenticated())
    {
        return res.redirect('/users/inventory');
    }

    next();
}

function logout(req, res, next){
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
    });
    res.redirect('/')
}

async function getPokemonsId(req) {
    const db = await databaseService.openDatabase(true);
    const user1 = await req.user;
    const sql = "SELECT idPokemona from Ekwipunek WHERE idUzytkownika= ?;";
    const params = [user1.id];


    return new Promise((resolve, reject) => {
         db.all(sql, params, (err, rows) => {
            if (err) {
                databaseService.closeConnection(db);
                throw err;
            } else {
                if (rows.length > 0) {
                    resolve(rows);
                    databaseService.closeConnection(db);
                } else{
                  resolve([]);
                }
            }
        })

    })
}

async function loadInventory (req) {

    let pokemonId = await getPokemonsId(req);

    let pokemonNames = pokemonId.map(element => {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${element.idPokemona}`)
        .then(response => response.json())
            .then(response => response.name[0].toUpperCase() + response.name.slice(1))
    })

    let pokemonImgs = pokemonId.map(element => {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${element.idPokemona}`)
            .then(response => response.json())
            .then(response => response.sprites.front_default)
    })

    return new Promise( (resolve, reject) => {
        Promise.all(pokemonNames)
            .then((results) => {
                pokemonNames = results;
                Promise.all(pokemonImgs)
                    .then(async(results) => {
                        // res.render('inventory', {user: await req.user, logged: true, imgs: results, names: pokemonNames});
                        resolve({imgs: results, names: pokemonNames});
                    })
            })
    })
}

async function showInventory(req, res, next) {
    res.render('inventory', Object.assign({}, {user: await req.user, logged: true},
        await loadInventory(req)));
}

module.exports = {
    register,
    checkAuthenticated,
    checkNotAuthenticated,
    logout,
    loadInventory,
    showInventory
}