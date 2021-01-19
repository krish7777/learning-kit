const express = require('express')

const { signupAdmin, loginAdmin } = require('../controllers/auth');
const isAuth = require('../middlewares/is-auth');
const isAdmin = require('../middlewares/is-admin');

const router = express.Router();

router.post('/register-admin', signupAdmin)//FOR INTERNAL USE ONLY, NOT PUBLIC
router.post('/login-admin', loginAdmin)

//For all authenticated routes , add the isAuth middleware
router.post('/secret', isAuth, (req, res) => {
    res.send("heyyy u paassed")
})

router.post('/secret-admin', isAdmin, (req, res) => {
    res.send("ok you are an admin")
})



module.exports = router