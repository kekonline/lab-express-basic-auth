const express = require('express');
const router = express.Router();

const { isLoggedIn } = require("../middlewares/auth.sites.js")

router.get("/main",isLoggedIn, (req, res, next) => {
    res.render("main.hbs")
})




router.get("/private",isLoggedIn, (req, res, next) => {
    res.render("private.hbs")
})










module.exports = router;