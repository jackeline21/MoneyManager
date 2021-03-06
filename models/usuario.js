const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const bcrypt = require("bcrypt");

// Definición del Schema
const usuarioSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
            
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        default: "default.png"
    },
    token: String,
    expires: Date
});

// Hooks (método) para hash + salt password
usuarioSchema.pre("save", function(next) {
    const usuario = this;

    // Si el password ya fué modificado (ya hasheado)
    if(!usuario.isModified("password")) {
        return next();
    }

    // Generar el salt y si no hay error, hashear el password
    // Se almacena tanto el hash+salt para evitar ataques
    // de rainbow table.
    bcrypt.genSalt(10, (err, salt) => {
        // Si hay un error no continuar
        if (err) return next(err);

        // Si se produjo el salt, realizar el hash
        bcrypt.hash(usuario.password, salt, (err, hash) => {
            if (err) return next(err);
  
            usuario.password = hash;
            next();
        });
    }); 
});

// Hooks para poder pasar los errores de MongoBD hacia express validator
usuarioSchema.post("save", function(error, doc, next) {
    // Verificar que es un error en MongoDB
    if(error.name === "MongoError" && error.code === 11000) {
        next(
            "Ya existe un usuario con la dirección de correo electrónico ingresada"
        ); 
    }
    else {
        next(error);
    }
});

module.exports = mongoose.model("usuario", usuarioSchema);