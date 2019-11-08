const mongoose = require("mongoose");
const User = mongoose.model("usuario")
const { validationResult } = require("express-validator");
const passport = require("passport");
const crypto = require("crypto");
const enviarEmail = require("../handlers/email");

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

exports.saveUser = async(req, res, next) => {

    //verificar que no existan errores de validacion
    const errors = validationResult(req);
    const errorsArray = [];

    //si hay errores
    if (!errors.isEmpty()) {
        errors.array().map(error => errorsArray.push(error.msg));
        
        //enviar los errores al usuario
        req.flash("error", errorsArray);
        res.render("crearCuenta",{
            messages: req.flash()
        });
    }

    //crear el usuario

    const user = new User(req.body)

    await user.save();

    res.redirect("/iniciarSesion")

}

exports.authenticateUser = function(req, res, next){
    passport.authenticate('local', {
        successRedirect: "/appHome",
        failureRedirect: "/iniciarSesion",
        failureFlash: true,
        failureFlash: "usuario o contraseña erroneos."
    })(req, res, next);
}

exports.logOut = function(req, res){
    req.logout();
    req.flash("Sesión cerrada")
    res.redirect("/iniciarSesion");
}

//////////////////////////////////////////////////////////////////
// Muestra el formulario de reseteo de contraseña
exports.formularioReestablecerPassword = (req, res) => {
    res.render("reestablecerPass", {
      nombrePagina: "Reestablece tu contraseña",
      tagline:
        "Si ya tienes una cuenta en MoneyManager pero olvidaste tu contraseña, favor coloca tu correo electrónico."
    });
  };
  
  exports.enviarToken = async (req, res) => {
    // Verificar si el correo electrónico es válido
    const usuario = await User.findOne({ email: req.body.email });
  
    // Si el usuario no existe
    if (!usuario) {
      req.flash("error", ["El correo electrónico ingresado no existe"]);
      return res.redirect("/res_pass");
    }
  
    // El usuario existe, generar el token
    usuario.token = crypto.randomBytes(20).toString("hex");
    usuario.expires = Date.now() + 3600000;
  
    // Guardar el usuario
    await usuario.save();
  
    // Generar la URL
    const resetUrl = `http://${req.headers.host}/reestablecerPass/${usuario.token}`;
  
    // Enviar la notificación por email
    await enviarEmail.enviar({
      usuario,
      subject: "Reestablecer tu contraseña",
      template: "resetPassword",
      resetUrl
    });
  
    // Redireccionar
    req.flash("correcto", [
      "Verifica tu correo electrónico para seguir las instrucciones"
    ]);
    res.redirect("/iniciarSesion");
  };
  
  // Mostrar el formulario de cambio de contraseña
  exports.formularioNuevoPassword = async (req, res) => {
    // buscar el usuario por medio del token y la fecha de expiración
    const usuario = await User.findOne({
      token: req.params.token,
      expires: { $gt: Date.now() }
    });
  
    // No se pudo encontrar el usuario con el token o token vencido
    if (!usuario) {
      req.flash("error", [
        "Solicitud expirada. Vuelve a solicitar el cambio de contraseña"
      ]);
      return res.redirect("/res_pass");
    }
  
    // Mostrar el formulario de nueva password
    res.render("nuevoPassword", {
      nombrePagina: "Ingresa tu nueva contraseña",
      tagline: "Asegurate de utilizar una contraseña segura"
    });
  };
  
  // Almacena la nueva contraseña
  exports.almacenarNuevaPassword = async (req, res) => {
    // buscar el usuario por medio del token y la fecha de expiración
    const usuario = await User.findOne({
      token: req.params.token,
      expires: { $gt: Date.now() }
    });
  
    // No se pudo encontrar el usuario con el token o token vencido
    if (!usuario) {
      req.flash("error", [
        "Solicitud expirada. Vuelve a solicitar el cambio de contraseña"
      ]);
      return res.redirect("/res_pass");
    }
  
    // Obtener el nuevo password
    usuario.password = req.body.password;
    // Limpiar los valores que ya no son requeridos
    usuario.token = undefined;
    usuario.expira = undefined;
  
    // Almacenar los valores en la base de datos
    await usuario.save();
  
    // Redireccionar
    req.flash("correcto", ["Contraseña modificada correctamente"]);
    res.redirect("/iniciarSesion");
  };

exports.perfil = function(req, res){
  res.render("perfil",{
      layout: "appHome.handlebars"
  });
}