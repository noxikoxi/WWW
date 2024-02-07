var express = require('express');
var router = express.Router();
const passport = require('passport');

const usersService = require("../services/usersService");
const randomPokemonService = require("../services/randomPokemonService");

router.get('/', usersService.checkNotAuthenticated, function(req, res, next) {
  res.render('login', {title : "Konto Trenera"});

});

router.post('/', usersService.checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/users/logged',
    failureRedirect: '/users',
    failureFlash: true
}));

router.get('/logged', usersService.checkAuthenticated, async function (req, res, next) {
    res.render('succesfulLogin', {title: "Zalogowano", user: await req.user, logged: true});
});

router.get('/register',usersService.checkNotAuthenticated ,function(req, res, next) {
  res.render('register', {title : "Rejestracja"});
});

router.get('/inventory', usersService.checkAuthenticated, usersService.showInventory);

router.post('/register', usersService.checkNotAuthenticated, usersService.register);

router.delete('/logout', usersService.checkAuthenticated,  usersService.logout);

router.get('/randomPokemon', usersService.checkAuthenticated, randomPokemonService.generatePokemon )

router.get('/addPokemon', usersService.checkAuthenticated, randomPokemonService.addPokemon)

module.exports = router;
