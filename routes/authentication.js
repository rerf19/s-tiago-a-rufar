const express = require('express');
const router = express.Router();

const passport = require('passport');
const {isLoggedIn} = require('../lib/auth')

//LOGIN
router.post('/login', passport.authenticate('local.login', {
      successRedirect: '/user/perfil',
      failureRedirect: '/',
      failureFlash: true
}));


//REGISTAR
router.post('/registar', passport.authenticate('local.registar',{
    successRedirect: '/',
    successFlash:true,
    failureRedirect: '/',
    failureFlash: true
}))


router.get('/error', (req,res) => {
    res.send('somo error ocorred');
})

require('./USER_profile.js');
module.exports = router;