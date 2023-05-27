const express = require("express");
const { createPost, updatePost } = require("../controllers/posts.controller");
const { createPostValidator, updatePostValidator } = require("../middlewares/validations.middleware");
const { upload } = require("../utils/multer");
const authenticate = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/api/v1/posts", upload.single('image'), authenticate,createPostValidator,createPost)

router.put("/api/v1/posts/:id", authenticate,updatePostValidator,updatePost)


module.exports = router