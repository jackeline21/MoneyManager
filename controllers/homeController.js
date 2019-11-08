const mongoose = require("mongoose");
const Purse = mongoose.model("Purse");

// Landing Page 
exports.mostrarInicio = async(req, res) =>{
   
        res.render("landingPage", {

            nombrePagina: "Budget-Suport",
        });
    
}

// Inicio de la App
exports.mostrarInicio1 = function(req, res){
    
    // Evaluar si es un usuario existente o no 

    let purse = Purse.count()
    
    purse.countDocuments({user: req.user._id}, function(err, count){
        if(count>0) {
            res.redirect("/home");
        } else {
            res.render("homeNewUser", {
                layout: "main.handlebars",
                nombrePagina: "Inicio"
            });
        }   

    })
    
};

exports.mostrarAppHome = async(req, res) => {

    const purs = await Purse.findOne({user: req.user._id});

    res.render("inicioApp", {
        layout: "appHome.handlebars",
        data: purs,
        chartData: JSON.stringify(purs),
        nombrePagina: "Inicio"
    });

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


