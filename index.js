const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
require("./config/db");
const express = require("express");
const expressHandleBars = require("express-handlebars");
const path = require("path");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const passport = require("passport");
const createError = require("http-errors");


// Archivo para las variables de entorno
require("dotenv").config({ path: "variables" });

const app = express();

// habilatarn body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// habilitar handlebars como template engine
app.engine(
    "handlebars",
    expressHandleBars({
        defaultlayout: "main",
        helpers: require("./helpers/handlebars")
    })
);

app.set("view engine", "handlebars");



app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(
    session({
        secret: process.env.SECRET,
        key: process.env.KEY,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

app.use(flash());

app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

//passport config
require("./config/passport")(passport)
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (req, res, next) {
    res.locals.user = req.user || null;
    next();
})

app.use("/", router());

// 404
app.use((req, res, next) => {
    next(createError(404, "La página que has solicitado no existe"));
});

// Administración de los errores
app.use((error, req, res, next) => {
    const status = error.status || 500;
    res.locals.status = status;
    res.status(status);

    res.render("error", {
        status,
        message: error.message
    });
});


// Permitir que Heroku nos asigne un puerto
const host = "0.0.0.0";
const port = process.env.PORT;


app.listen(port, host, () => {
    console.log("El servidor está ejecutandose");
});
