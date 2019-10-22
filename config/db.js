const mongoose = require("mongoose");
require("dotenv").config({path:"variables.env"});

// Configuración de mongoose
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("error", error => {
    console.log(error);
})

require("../models/categoria");
require("../models/purse");
require("../models/usuario");