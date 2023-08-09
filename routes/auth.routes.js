const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs")
const User = require("../models/User.model.js")

router.get("/signup", (req, res, next) => {
    res.render("auth/signup.hbs")
})

//Doing a little DRY
function verifyEmptyFields(res, username, password, hbsFile) {

    if (username === "" || password === "") {
        res.status(400).render(hbsFile
            , { errorMessage: "All the info fields are required!" })
        return;
    }
}


router.post("/signup", async (req, res, next) => {
    const { username, password } = req.body

    verifyEmptyFields(res, username, password,"auth/signup.hbs")

    try {
        const userSignUpAttempt = await User.findOne({ username })

        if (userSignUpAttempt !== null) {
            res.status(400).render("auth/signup.hbs"
                , { errorMessage: "Username already exists!" })
            return;
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        await User.create({
            username: username,
            email: email,
            password: passwordHash
        })

        res.redirect("/auth/login")

    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.get("/login", (req, res, next) => {
    res.render("auth/login.hbs")
})

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body
    verifyEmptyFields(res, username, password,"auth/login.hbs")
try {
    const userLoginAttempt = await User.findOne({ username })
    if (userLoginAttempt === null) {
        res.status(400).render("auth/login.hbs", {
          errorMessage: "This username does not exist!"
        })
        return;
      }

      const passwordVerification = await bcrypt.compare(password, userLoginAttempt.password)
      if (passwordVerification === false) {
        res.status(400).render("auth/login.hbs", {
          errorMessage: "Password is incorrect!"
        })
        return; 
      }

      req.session.user = {
        _id: userLoginAttempt._id,
        email: userLoginAttempt.username}

        req.session.save(() => {

            // Si todo sale bien...
            res.render("auth/login.hbs")
            // ! DESPUES DE CREAR LA SESION, TENEMOS ACCESO A REQ.SESSION.USER EN CUALQUIER RUTA DE MI SERVIDOR
          })









      

} catch (error) {
    console.log(error)
    next(error)
    
}


})





module.exports = router;