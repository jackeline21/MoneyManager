const mongoose = require("mongoose");
const purse = mongoose.model("Purse");

exports.start = async (req, res) => {
    // asignar el id del uauario logueado al modelo de mongo
    // purse.user = req.user_id;
    const pur = new purse({
        user: req.user._id
    });
    pur.save(function(err, cb){     
    })

    purse.updateOne({
        user: req.user._id
    },
    {
        $push: {account:{
            "name": req.body.account
        }}
    },
    function(err, cb){
    });

    let d = new Date();
    let month = d.getMonth();

    purse.updateOne({
        user: req.user._id
    },
    {
        $push: {budget:{
            "amount": req.body.budget,
            "month": month
        }}
    },
    function(err, cb){});

    res.redirect("/appHome")
}

exports.addAccount = async (req, res) => {
    // asignar el id del uauario logueado al modelo de mongo
    // purse.user = req.user_id;
    purse.updateOne({
        user: req.user._id
    },
    {
        $push: {account:{
            "name": req.body.account
        }}
    },
    function(err, cb){});

    res.redirect("/appHome")
}

exports.addIncome = async(req, res) => {
    purse.updateOne({
        user: req.user._id
    },
    {
        $push:{income:{
            "amount": Number(req.body.amount),
            "account": req.body.account,
            "comment": req.body.comment
        }}
    },function(err, cb) {})

    res.redirect("/appHome")

}

exports.addExpense = async(req, res) => {
    purse.updateOne({
        user: req.user._id
    },
    {
        $push:{expense:{
            "category": req.body.category,
            "amount": Number(req.body.amount),
            "account": req.body.account,
            "comment": req.body.comment
        }}
        
        
    },function(err, cb) {})

    res.redirect("/appHome");
}