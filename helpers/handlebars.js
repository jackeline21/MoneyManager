//const mongoose = require("mongoose");
//const Purse = mongoose.model("Purse");

module.exports = {
    Categorias: (e, options) => {
        const ListaCategorias = [
            "Maquillaje",
            "Casa",
            "Comida",
            "Comunicación",
            "Deportes",
            "Entretenimiento",
            "Salón de belleza",
            "Spa",
            "Ropa",
            "Regalos",
            "Transporte",
            "Higiene",
            "Facturas",
            "Gym",
            "Deportes",
            "Mascotas",
            "Zapatos"
        ];

        let html = "";

        // Mostrar las categorías
        ListaCategorias.forEach(categoria => {
            
            html += `<option>${categoria}</option>`;
        }); 

        return (options.fn().html = html);
    },
    accountLister: (e, options) => {


        let html = "";

        // Mostrar las categorías
        e.account.forEach(acc => {
            
            html += `<option>${acc.name}</option>`;
        }); 

        return (options.fn().html = html);
    }

    

}