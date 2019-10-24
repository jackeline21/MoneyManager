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
    if(!purse) {
        res.render("inicioApp", {
            layout: "appHome.handlebars",
            nombrePagina: "Inicio"  
        });
    } else {
        res.render("homeNewUser", {
            layout: "main.handlebars",
            nombrePagina: "Inicio"
        })
    }
    

}

exports.efectivoCuentas = function(req, res){
    res.render("principal", {
        layout: "efectivoCuentas.handlebars",
        nombrePagina: "Inicio",
        tagline: "Administra tu dinero de la mejor manera",
        barra: true,
        boton: true
    });  
}

exports.bodyInicio = function(req, res){
    res.render("principal", {
        layout: "inicioApp.handlebars",
        nombrePagina: "Inicio",
        tagline: "Administra tu dinero de la mejor manera",
        barra: true,
        boton: true
    });  
}