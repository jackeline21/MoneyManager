// Categorías de los gastos
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

categoriaSchema = new mongoose.Schema({
    // Primero el usuario al que pertenece la categoría
    user:{
        email:{
            type: String,
            required: true
        }
    },
    name: [{
        type: String,
        required: true
    }]
})

module.exports = mongoose.Schema.model(Categoria, categoriaSchema)