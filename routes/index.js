const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const homeController = require("../controllers/homeController");
const userController = require("../controllers/userController");
const purseController = require("../controllers/purseController");

module.exports = () => {

    router.get("/", homeController.mostrarInicio);
    router.get("/appHome", homeController.mostrarInicio1);
    router.get("/cuenta", homeController.cuenta);
    router.get("/inicioApp", homeController.bodyInicio);
    router.get("/homeNewUser",homeController.mostrarInicio1);
    router.get("/home", homeController.mostrarAppHome)
    

    // Rutas de usuario
    // Inicio de sesión
    router.get("/iniciarSesion", userController.iniciarSesion);
    router.post("/iniciarSesion", userController.authenticateUser);

    //logout
    router.get("/logout", userController.logOut);

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
    
    // purse controller
    router.post("/start", purseController.start);

    // add Account
    router.post("/addAcount", purseController.addAccount);

    // Add Ingreso
    router.post("/addIncome", purseController.addIncome);
    return router;
};

