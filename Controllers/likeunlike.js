const mongoose = require("mongoose");
const Post = mongoose.model("Post");

const likeunlike = (req, res) => {
  Post.findById(req.body.id).exec((err, result) => {
    if (err) {
      return res.status(422).json({ message: err });
    }
    if (result.Like.includes(req.user._id) || result.Like.length > 0) {
      Post.findByIdAndUpdate(
        result._id,
        { $pull: { Like: req.user._id } },
        { new: true }
      )
        .then((saved) => {
          return res.status(201).json({ message: saved });
        })
        .catch((err) => {
          return res.status(401).json({ message: err });
        });
    } else {
      Post.findByIdAndUpdate(
        result._id,
        { $push: { Like: req.user._id } },
        { new: true }
      )
        .then((saved) => {
          if (saved) {
            return res.status(201).json({ message: saved });
          }
        })
        .catch((err) => {
          return res.status(422).json({ message: err });
        });
    }
  });
};

module.exports = { likeunlike };
