const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


//ADDED NEEDED ROUTES
const authRouter = require("./auth.routes.js")
router.use("/auth", authRouter)


//! TRYING SOME LITTLE NEW TRICKS
router.use("/", require("./user.routes.js"))


module.exports = router;
