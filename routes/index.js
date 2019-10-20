const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const userController = require("../controllers/userController");

module.exports = () => {
    router.get("/", homeController.mostrarInicio);
    router.get("/appHome", homeController.mostrarInicio1);
    router.get("/crearCuenta", userController.crearCuenta);
    return router;
};

