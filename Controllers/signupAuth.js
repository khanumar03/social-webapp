const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("../models/user")

const User = mongoose.model("User");

const signupAuth = (req, res, next) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(422).json({ message: "error" });
  }
  User.findOne({ email: email })
    .then((saveuser) => {
      if (saveuser) {
        return res.status(422).json({ message: "user already exist" });
      }
      bcrypt
        .hash(password, 10)
        .then((hashPassword) => {
          const user = User.create({
            userName: userName,
            email: email,
            password: hashPassword,
          })
            .then((user) => {
              const token = jwt.sign(
                { _id: user._id },
                process.env.SECRET_KEY
              );
              return res.json({ token });
            })
            .catch((err) => {
              // console.log(err);
            });
        })
        .catch((err) => {
          // console.log(err);
        });
    })
    .catch((err) => {
      // console.log(err);
    });
};

module.exports =  { signupAuth };
