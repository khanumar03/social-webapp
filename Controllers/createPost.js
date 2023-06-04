require("dotenv").config()
const mongoose = require("mongoose")
require("../models/post")

const Post = mongoose.model("Post");

const createPost = (req,res) => {
    const {imgsrc, description} = req.body

    if(!imgsrc || !description) {
        return res.status(422).json({ err:"fill all the data"})
    }

    const post = new Post({
        imgsrc,
        description,
        postedby: req.user,
    })

    post.save().then(result =>{
        return res.status(201).json({post:result})
    }).catch(err => {
        console.log(err)
    })
}

module.exports = { createPost } ;