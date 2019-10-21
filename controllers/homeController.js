
exports.mostrarInicio = function(req, res){
        res.render("landingPage", {
            nombrePagina: "WomanPurse"  
        });
    
}

exports.mostrarInicio1 = function(req, res){
    res.render("inicioApp", {
        layout: "appHome.handlebars",
        nombrePagina: "Inicio"  
    });

}

// exports.mostrarInicio1 = function(req, res){
//     res.render("principal", {
//         layout: "appHome.handlebars",
//         nombrePagina: "Inicio",
//         tagline: "Administra tu dinero de la mejor manera",
//         barra: true,
//         boton: true
//     });  
// }

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