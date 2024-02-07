const databaseService = require("./databaseService");


const getAnnouncements = (req, res, next) => {
    const sql = "SELECT tytul, tekst from Ogłoszenia where czyWyswietlic = 1 ORDER BY id DESC";

    const db = databaseService.openDatabase(true);


    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        } else {
            res.render('index', {data: rows});
        }
    })

    databaseService.closeConnection(db);
}

module.exports = {
    getAnnouncements,
}