
exports.mostrarInicio = function(req, res){
    res.render("landingPage", {
        nombrePagina: "Inicio",
        tagline: "Administra tu dinero de la mejor manera",
        barra: true,
        boton: true
    });
    
}
