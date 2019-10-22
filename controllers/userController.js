const mongoose = require("mongoose");
const Usuario = mongoose.model("usuario")
const { validationResult } = require("express-validator");
const passport = require("passport");

exports.crearCuenta = function(req, res){
    res.render("crearCuenta", {
        nombrePagina: "Registrarse",
        tagline: "Administra tu dinero de la mejor manera",
    });   
}

exports.iniciarSesion = function(req, res){
    res.render("iniciarSesion", {
        nombrePagina: "Iniciar Sesión",
        tagline: "Administra tu dinero de la mejor manera",
    });   
}
console.log("test");

exports.saveUser = async(req, res, next) => {

    //verificar que no existan errores de validacion
    const errors = validationResult(req);
    const errorsArray = [];

    //si hay errores
    if (!errors.isEmpty()) {
        errors.array().map(error => errorsArray.push(error.msg));
        
        //enviar los errores al usuario
        req.flash("error", errorsArray);
        console.log(errorsArray)
        res.render("crearCuenta",{
            messages: req.flash()
        });
    }

    //crear el usuario

    const usuario = new Usuario(req.body)

    await usuario.save();

    res.redirect("/iniciarSesion")

}

exports.authenticateUser = function(req, res, next){
    console.log("configuracion controller")
    console.log( req.body)
    passport.authenticate('local', {
        successRedirect: "/appHome",
        failureRedirect: "/",
        failureFlash: true
    })(req, res, next);
}