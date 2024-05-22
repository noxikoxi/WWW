const e = require("express");
const sqlite3 = require('sqlite3').verbose()

closeConnection = function (db){
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

openDatabase = function (readOnly){

    let param = sqlite3.OPEN_READONLY

    if (!readOnly) {
        param = sqlite3.OPEN_READWRITE
    }
    return new sqlite3.Database("./database/pokebase.db", param, (err) => {
        if (err) {
            console.error(err.message)
        } else {
        }
    });
}
 function findUserByEmail(email)
{
    const db = openDatabase(true);

    const sql = "Select id, nazwa, haslo from Uzytkownicy WHERE email=(?)";
    const params = [email];

    return new Promise( (resolve, reject) => {
        db.get(sql, params, (err, row) => {

            if (err){
                closeConnection(db);
                reject(null);
            }else{
                if (row === undefined) {
                    closeConnection(db);
                    resolve(null);
                }else{
                    closeConnection(db);
                    resolve({id: row.id, name: row.nazwa, password: row.haslo});
                }
            }
        })
    })

}

function findUserById(id)
{
    const db = openDatabase(true);

    const sql = "Select id, nazwa, haslo from Uzytkownicy WHERE id=(?)";
    const params = [id];

    return new Promise( (resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err){
                closeConnection(db);
                reject(null);
            }else{
                closeConnection(db);
                resolve({id: row.id, name: row.nazwa, password: row.haslo});

            }
        })
    })

}

module.exports = {
    closeConnection,
    openDatabase,
    findUserByEmail,
    findUserById
}