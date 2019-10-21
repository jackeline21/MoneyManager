exports.crearCuenta = function(req, res){
    res.render("crearCuenta", {
        nombrePagina: "Registrarse",
        tagline: "Administra tu dinero de la mejor manera",
    });   
}

exports.iniciarSesion = function(req, res){
    res.render("iniciarSesion", {
        nombrePagina: "Iniciar Sesión",
        tagline: "Administra tu dinero de la mejor manera",
    });   
}