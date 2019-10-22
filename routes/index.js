const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const homeController = require("../controllers/homeController");
const userController = require("../controllers/userController");

module.exports = () => {

    router.get("/", homeController.mostrarInicio);
    router.get("/appHome", homeController.mostrarInicio1);
    router.get("/efectivoCuentas", homeController.efectivoCuentas);
    router.get("/inicioApp", homeController.bodyInicio);

    // Rutas de usuario
    // Inicio de sesión
    router.get("/iniciarSesion", userController.iniciarSesion);
    router.post("/iniciarSesion", userController.authenticateUser);

    // Crear cuenta
    router.get("/crearCuenta", userController.crearCuenta);
    router.post("/crearCuenta",[

        check("name", "El nombre de usuario es requerido.")
            .not()
            .isEmpty()
            .escape(),
        check("email","El correo electrónico es requerido.")
            .not()
            .isEmpty(),
        check("email", "El correo electrónico no es vålido.")
            .isEmail()
            .normalizeEmail(),
        check("password", "La contraseña es requerida.")
            .not()
            .isEmpty(),
        check("confirm-password", "Debe ingresar la confirmacion de su contraseña.")
            .not()
            .isEmpty(),
        check("confirm-password", "Las contraseñas no coinciden.")
            .custom((value, { req }) => value === req.body.password)
    ], userController.saveUser);
    
    return router;
};

