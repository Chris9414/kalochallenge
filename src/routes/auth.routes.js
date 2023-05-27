const express = require("express");
const { login } = require("../controllers/users.controller");


const router = express.Router()

router.post("/api/v1/login", login);

module.exports = router