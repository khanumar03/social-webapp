const mongoose = require("mongoose")
require("../models/post")

const Post = mongoose.model("Post");

module.exports = (req,res) => {
    Post.find({postedby: req.user._id}).populate("postedby","_id userName")
    .then((savepost) => {
        if(savepost) {
          return  res.status(201).json({saved:savepost})
        }
    })
    .catch((err) => {
        res.json({err:err})
    })
}