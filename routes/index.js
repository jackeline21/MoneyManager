const express = require("express");
const router = express.Router();
const homeControler = require("../controllers/homeController");

module.exports = () => {
    router.get("/", homeControler.mostrarInicio);

    return router;
};
