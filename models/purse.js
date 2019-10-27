const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Schema de las cuentas
const purseSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true,
        unique: true
    },
    budget:[{
        amount: {
            type: Number
        },
        month: {
            type: String
        }
    }],
    account:[{
        name: {
            type: String
        }
    }],
    savings: [{
        name: {
            type: String
        },
        goal: {
            type: Number
        },
        amount: {
            type: Number
        }
    }],
    income: [{
        amount: {
            type: Number
        },
        account: {
            type: String
        },
        comment: {
            type: String
        }
    }],
    expense: [{
        category:{
            type: String,
            required: true
        }, 
        amount:{
            type: Number,
            required: true
        },
        comment:{
            type: String
        },
        account:{
            name: String,
            
        }
    }]
})

module.exports = mongoose.model("Purse", purseSchema)