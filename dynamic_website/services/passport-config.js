const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById){
    const authenticateUser = async (email, password, done) => {

        const user = await getUserByEmail(email);

        if (user == null){
            return done(null, false, {message: "Brak uzytkownika o takim adresie email"});
        }
        try{
            if (await bcrypt.compare(password, user.password))
            {
                return done(null, user);

            }else{
                return done(null, false, {message: "Hasło jest nieprawidłowe"});
            }
        }catch (error) {
            return done(error);
        }
    }

    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, authenticateUser))

    passport.serializeUser((user, done) => {
        // console.log(user);
        done(null, user.id)
    });
    passport.deserializeUser((id, done) => {
        // console.log(getUserById(id));
        return done(null, getUserById(id));
    });
}



module.exports = initialize