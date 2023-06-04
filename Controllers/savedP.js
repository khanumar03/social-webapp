const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");

const savedP = (req, res) => {
  const { id } = req.body;

  User.findById(req.user._id).exec((err, result) => {
    if (err) {
      return res.status(422).json({ message: err });
    }
    if (result.savedID.includes(id)) {
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { savedID: id },
        },
        {
          new: true,
        }
      )
        .then((saved) => {
          return res.status(201).json({ message: saved, msg: "Post unsaved" });
        })

        .catch((err) => {
          return res.status(422).json({ message: err });
        });
    } else {
      Post.findById({ _id: id })
        .then((saved) => {
          if (saved) {
            User.findByIdAndUpdate(
              req.user._id,
              {
                $push: { savedID: saved._id },
              },
              {
                new: true,
              }
            )
              .then((saved) => {
                // console.log(saved);
                return res.status(201).json({ message: saved, msg: "Post saved" });
              })
              .catch((err) => {
                // console.log(err);
                return res.status(422).json({ message: err });
              });
          }
        })
        .catch((err) => {
          // console.log(err);
          return res.status(401).json({ message: err });
        });
    }
  });
};

module.exports = { savedP };
