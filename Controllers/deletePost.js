const mongoose = require("mongoose")
require("../models/post")

const Post = mongoose.model("Post");

const deletePost = (req,res) => {
    const { id } = req.body
    Post.deleteOne({_id: id})
    .then((del) => {
        res.status(201).json({message: del})
    })
    .catch((err) => {
        res.status(422).json({message: err})
    }) 

}

module.exports = { deletePost }