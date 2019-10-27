const mongoose = require("mongoose");
const Purse = mongoose.model("Purse");

// Landing Page 
exports.mostrarInicio = async(req, res) =>{
    const purs = await Purse.findOne({user: req.user._id});
        
        res.render("landingPage", {
            data: purs,
            nombrePagina: "WomanPurse",
            data: purs 
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

exports.bodyInicio = async(req, res) =>{
    const purs = await Purse.findOne({user: req.user._id});

    res.render("principal", {
        layout: "inicioApp.handlebars",
        nombrePagina: "Inicio",
        data: purs,
        tagline: "Administra tu dinero de la mejor manera",
        barra: true,
        boton: true
    });  
};

// Manejo de cuentas
exports.cuenta = async(req, res) =>{
    const purs = await Purse.findOne({user: req.user._id});
    res.render("cuenta", {
        layout: "appHome.handlebars",
        nombrePagina: "Cuentas",
        data: purs,
        tagline: "Administra tu dinero de la mejor manera",
        barra: true,
        boton: true
    });  
};


