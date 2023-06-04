const mongoose = require("mongoose");
require("../models/post");

const Post = mongoose.model("Post");

const comment = (req, res) => {
  const { commentM, id } = req.body;

    Post.findByIdAndUpdate(
      id,
      {
        $push: { Comment: { commentBy: req.user.userName, comment: commentM } },
      },
      { new: true }
    )
      .then((saved) => {
        return res.status(201).json({ message: saved });
      })
      .catch((err) => {
        return res.status(201).json({ message: err });
      });
};

module.exports = { comment };
