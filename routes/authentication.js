const express = require('express');
const router = express.Router();

//const passport = require('passport');
// const {isLoggedIn} = require('../lib/auth')

// LOGIN
 router.post('/login', //passport.authenticate('local.login', {
//     successRedirect: '/user/perfil',
//     failureRedirect: '/',
//     failureFlash: true
// }));
async (req,res,next) => {
    res.redirect('/user/perfil');
})



// REGISTAR
// router.post('/registar', passport.authenticate('local.registar',{
//     successRedirect: '/',
//     successFlash:true,
//     failureRedirect: '/',
//     failureFlash: true
// }))


// router.get('/error', (req,res) => {
//     res.send('some error ocorred');
// })

// require('./USER_profile.js');
module.exports = router;