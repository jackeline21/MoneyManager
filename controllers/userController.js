const mongoose = require("mongoose");
const User = mongoose.model("usuario")
const { validationResult } = require("express-validator");
const passport = require("passport");
const crypto = require("crypto");
const enviarEmail = require("../handlers/email");
const multer = require("multer");
const shortid = require("shortid");

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


// Subir una imagen al servidor
exports.uploadImage = async (req, res, next) => {
  upload(req, res, function(error) {
      if (error) {
        // Errores de multer
        if (error instanceof multer.MulterError) {
          if (error.code === "LIMIT_FILE_SIZE") {
            req.flash("error", [
              "El tamaño del archivo es demasiado grande. Máximo 200Kb"
            ]);
          } else {
            req.flash("error", [error.message]);
          }
        } else {
          // Errores del usuario
          req.flash("error", [error.message]);
        }
        // Redireccionar
        res.redirect("/profile");
        return;
      } else {
        return next();
      }
    });
  };

// Opciones de configuracion de Multer
const configuracionMulter = {
    // Tamaño máximo del archivo en bytes
    limits: {
      fileSize: 200000
    },
    // Dónde se almacena la imagen
    storage: (fileStorage = multer.diskStorage({
      destination: (req, res, cb) => {
        cb(null, __dirname + "../../public/uploads/profiles");
      },
      filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1];
        cb(null, `${shortid.generate()}.${extension}`);
      }
    })),
    // Verificar que es una imagen válida mediante el mimetype
    // http://www.iana.org/assignments/media-types/media-types.xhtml
    fileFilter(req, file, cb) {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        // El callback se ejecuta como true or false
        // se retorna true cuando se acepta la imagen
        cb(null, true);
      } else {
        cb(new Error("Formato de archivo no válido. Solo JPEG o PNG."), false);
      }
    }
  };
  
  const upload = multer(configuracionMulter).single("image");

  

exports.editProfile = async (req, res) => {
  // Buscar el usuario
  const user1 = await User.findById(req.user._id);

  // Modificar los valores
  user1.name = req.body.name;
  user1.email = req.body.email;

  console.log(req.body);
  
  if(req.body.password){
    user1.password = req.body.password;
  }
  
                 


  // Verificar si el usuario agrega una imagen
  if (req.file) {
      user1.image = req.file.filename;
  }


  
  // Guardar los cambios
  await user1.save(function(err, cb){
      console.log(err);
      
  });

  req.flash("Hecho", ["Cambios almacenados correctamente"]);

  // Redireccionar
  res.redirect("/perfil");
};
