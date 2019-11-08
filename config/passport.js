const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const usuario = mongoose.model("usuario")
const bcrypt = require("bcrypt");

module.exports = function(passport){
    // Local Strategy
    passport.use(new localStrategy(function(username, password, done){
        
        let query = { email:username }
        // Verificar el email
        usuario.findOne(query, function(err, usuario){   
            if (err) throw err;
            if (!usuario) {
                return done(null, false, {message: "No se encontró el usuario"})
            }

            bcrypt.compare(password, usuario.password, function(err, isMatch){
                if (err) throw err;

                if (isMatch){
                    return done(null, usuario);
                } else {
                    return done(null, false, {message: "Contraseña incorrecta"});
                }
            });
        });
    }));

    passport.serializeUser(function(usuario, done){
        done(null, usuario.id);
    });

    passport.deserializeUser(function(id, done){
        usuario.findById(id, function(err, usuario){
            done(err, usuario);
        });
    });
};