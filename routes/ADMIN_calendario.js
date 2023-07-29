const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const mysql = require('../database');
// const {isLoggedIn} = require('../lib/auth')
// const {isLoggedInADMIN} = require('../lib/auth')
// const helpers = require('../lib/helpers');
const fs = require('fs');

router.get('/', //isLoggedInADMIN , 
async (req,res) => {
    var menu = {} //await mysql.query('SELECT * FROM menus WHERE privilegio = 0');
    var menuAdmin = {} //await mysql.query('SELECT * FROM menus WHERE privilegio = 1');
    var calendario = {} //await mysql.query('SELECT * FROM calendario ORDER BY start DESC');
    res.render('ADMIN_calendario.ejs',{
        menu,
        menuAdmin,
        calendario
    });
})

router.post('/adicionar', //isLoggedInADMIN , 
async (req,res) => {
    // var title = req.body.titulo;
    // var color = req.body.cor;
    // var start = req.body.inicioData;
    // var start2 = req.body.inicioData;
    // var end = req.body.fimData;
    // var end2 = req.body.fimData;
    // var privilegio = req.body.priv;
    // if(req.body.inicioHora != ""){
    //     start = start+'T'+req.body.inicioHora;
    // }
    // if(req.body.fimHora != ""){
    //     end = end+'T'+req.body.fimHora;
    // }
    // await mysql.query('INSERT INTO calendario(title,color,start,end,privilegio,inicioHora,fimHora,inicioData,fimData) VALUES ("'+title+'","'+color+'","'+start+'","'+end+'","'+privilegio+'","'+req.body.inicioHora+'","'+req.body.fimHora+'","'+start2+'","'+end2+'")');
    res.redirect('/admin/calendario')
})

router.get('/:id', //isLoggedInADMIN ,
async (req,res) => {
    var menu = {} //await mysql.query('SELECT * FROM menus WHERE privilegio = 0');
    var menuAdmin = {} //await mysql.query('SELECT * FROM menus WHERE privilegio = 1');
    var evento = {} //await mysql.query('SELECT * FROM calendario WHERE idCalendario = "'+req.params.id+'"');
    res.render('ADMIN_calendarioEdit.ejs', {
        menu,
        menuAdmin,
        evento
    });
})

router.post('/editar', //isLoggedInADMIN ,
async (req,res) => {
    // var id = req.body.idCalendario;
    // var title = req.body.titulo;
    // var color = req.body.cor;
    // var start = req.body.inicioData;
    // var end = req.body.fimData;
    // var privilegio = req.body.priv;
    // if(req.body.inicioHora != ""){
    //     start = start+'T'+req.body.inicioHora;
    // }
    // if(req.body.fimHora != ""){
    //     end = end+'T'+req.body.fimHora;
    // }
    // await mysql.query('UPDATE calendario SET title = "'+title+'",color = "'+color+'",start = "'+start+'",end = "'+end+'", privilegio = "'+privilegio+'" WHERE idCalendario = "'+id+'"');
    res.redirect('/admin/calendario')
})

router.get('/eliminar/:id', //isLoggedInADMIN , 
async (req,res) =>{
    //await mysql.query('DELETE FROM calendario WHERE idCalendario = "'+req.params.id+'"')
    res.redirect('/admin/calendario')
})
module.exports = router;