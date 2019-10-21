const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const purseSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    accounts: [{
        name: {
            type: String
        },
        amount: {
            type: Number
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
    expense: [{
        category:{
            type: String,
            required: true
        }, 
        amount:{
            type: Boolean,
            required: true
        },
        comment:{
            type: String
        },
        date: {
            type: Date,
            required: true
        },
        account: {
            name: String
        }
    }]
})

module.exports = mongoose.model("Purse", purseSchema)