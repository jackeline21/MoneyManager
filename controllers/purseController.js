const mongoose = require("mongoose");
const purse = mongoose.model("Purse");

exports.start = async (req, res) => {
    // asignar el id del uauario logueado al modelo de mongo
    // purse.user = req.user_id;
    const pur = new purse({
        user: req.user._id
    });
    pur.save(function(err, cb){
        console.log(err);
        
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
        console.log(err);
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
    function(err, cb){
        console.log(err);
        
    });

    res.redirect("/appHome")

    console.log(req.body);

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
    function(err, cb){
        console.log(err);
    });

    res.redirect("/appHome")

    console.log(req.body);

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
    },function(err, cb) {
        console.log(err);
        
    })

    res.redirect("/appHome")

    console.log(req.body);

}

exports.addExpense = async(req, res) => {
    console.log(req.body);
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
        
        
    },function(err, cb) {
        console.log(err); 
    })

    res.redirect("/appHome");
}