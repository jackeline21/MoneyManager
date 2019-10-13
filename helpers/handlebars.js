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
            html += `<li>${categoria}</li>`;
        }); 

        return (options.fn().html = html);
    }
}