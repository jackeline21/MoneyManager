const mongoose = require("mongoose");
const Purse = mongoose.model("Purse");

// Landing Page 
exports.mostrarInicio = function(req, res){
        res.render("landingPage", {
            nombrePagina: "WomanPurse"  
        });
    
}

// Inicio de la App
exports.mostrarInicio1 = function(req, res){
    
    // Evaluar si es un usuario existente o no 

    let purse = Purse.count()
    console.log(res.locals.user.email);
    console.log(Purse);
    purse.countDocuments({user: req.user._id}, function(err, count){
        if(count>0) {
            res.redirect("/home");
        } else {
            res.render("homeNewUser", {
                layout: "main.handlebars",
                nombrePagina: "Inicio"
            });
            console.log("No está registrado")
        }   

    })
    
};

exports.mostrarAppHome = async(req, res) => {

    const purs = await Purse.findOne({user: req.user._id});
    console.log(purs.account);
    
    res.render("inicioApp", {
        layout: "appHome.handlebars",
        data: purs,
        nombrePagina: "Inicio"  
    });
    console.log("Si está registrado")

}

exports.bodyInicio = function(req, res){
    res.render("principal", {
        layout: "inicioApp.handlebars",
        nombrePagina: "Inicio",
        tagline: "Administra tu dinero de la mejor manera",
        barra: true,
        boton: true
    });  
};

// Manejo de cuentas
exports.cuenta = function(req, res){
    res.render("cuenta", {
        layout: "appHome.handlebars",
        nombrePagina: "Cuentas",
        tagline: "Administra tu dinero de la mejor manera",
        barra: true,
        boton: true
    });  
};


