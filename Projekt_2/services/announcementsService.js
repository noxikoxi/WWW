const sqlite3 = require('sqlite3').verbose()

closeConnection = function (db){
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
    });
}

openDatabase = function (){
    return new sqlite3.Database("./database/pokebase.db", sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            console.error(err.message)
        } else {
            console.log('Connected to database.');
        }
    });
}

const getAnnouncements = (req, res, next) => {
    const sql = "SELECT tytul, tekst from Ogłoszenia where czyWyswietlic = 1 ORDER BY id DESC";

    const db = openDatabase();


    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        } else {
            res.render('index', {data: rows});
        }
    })

    closeConnection(db);
}

module.exports = {
    getAnnouncements
}