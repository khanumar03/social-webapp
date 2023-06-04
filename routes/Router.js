const { loginAuth } = require("../Controllers/loginAuth")
const { signupAuth } = require('../Controllers/signupAuth')
const { createPost } = require("../Controllers/createPost")
const { currentUser } = require('../Controllers/currentUser')
const { deletePost } = require('../Controllers/deletePost')
const { likeunlike } = require("../Controllers/likeunlike")
const { comment } = require("../Controllers/comment")
require("../models/user")
require("../models/post")
const verifyJwt = require('../middleware/verifyJwt')
const mypost = require('../Controllers/mypost')
const express = require('express')
const { savedP } = require("../Controllers/savedP")

const router = express.Router();

router.post("/signup", signupAuth );
router.post("/login", loginAuth);
router.post("/createposts",verifyJwt, createPost)
router.get("/currentuserpost",verifyJwt, mypost)
router.get("/currentuser",verifyJwt,currentUser)
router.post("/postdelete",verifyJwt,deletePost)
router.post("/likeUnlike",verifyJwt,likeunlike)
router.post("/comment",verifyJwt,comment)
router.post("/findpostandAdd",verifyJwt, savedP)

module.exports =   router ;
