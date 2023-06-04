require("dotenv").config()
const mongoose = require("mongoose")
require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = mongoose.model("User");

const loginAuth = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(async (saveduser) => {
      if (!saveduser) {
        return res.status(422).json({ message: "Invalid email or password" });
      }
      const passwordT = await bcrypt.compare(password, saveduser.password);
      if (saveduser && passwordT) {
        //  res.status(200).json({ message: "login succesfully" });
        const token = jwt.sign({ _id: saveduser._id }, process.env.SECRET_KEY);
        return res.json({token});
      }
      return res
        .status(422)
        .json({ message: "email or password is not matched" });
    })
    .catch((err) => {
      // console.log(err);
    });
};

module.exports = { loginAuth } ;
