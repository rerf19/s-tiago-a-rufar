const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
// const mysql = require('../database');
// const {isLoggedIn} = require('../lib/auth')
// const {isNotLoggedIn} = require('../lib/auth')
// const helpers = require('../lib/helpers');
const fs = require('fs');

router.get('/', //isLoggedIn , 
async (req,res) => {
    var menu = {} //await mysql.query('SELECT * FROM menus WHERE privilegio = 0');
    var menuAdmin = {} //await mysql.query('SELECT * FROM menus WHERE privilegio = 1');
    var calendario = {} //await mysql.query('SELECT title,color,start,end FROM calendario');
    res.render('USER_calendar.ejs',{
        menu,
        menuAdmin,
        calendario
    });
})

module.exports = router;