const mongoose = require("mongoose")
require("../models/user")

const User = mongoose.model("User");

const currentUser = (req, res) => {
    User.findOne({_id: req.user._id})
    .then((saved) => {
        return res.status(201).json({message: {...saved}})
    })
    .catch((err) => {
        return res.status(422).json({message: err})
    })
}

module.exports =  { currentUser }
