const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../db');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, user, password, done) => {
    
    const rows = await db.query('SELECT * FROM users WHERE username = ?', [user]);
    // if (rows) {
        
    //     console.log(rows[0]);
    // } else {
    //     console.log('no found');
        
    // }
    
    if (rows.length > 0) {
        const user = rows[0];
        const validPass = await helpers.matchPassword(password, user.password);
        if (validPass) {
            done(null, user, req.flash('success', 'Bienvenido '+user.user));
        }else{
            done(null, false, req.flash('danger', 'Contraseña incorrecta'));
            // user.password = await helpers.encryptPassword(password);
            // await db.query('UPDATE users set ? WHERE id = ?', [user, user.id]);
            //     console.log(user);
           
        }
    }else{
        return done(null, false, req.flash('danger', 'Usuario incorrecto'));
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    const rows = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
  });

// passport.serializeUser((user, done) => {

// })

// passport.deserializeUser(async () => {

// })