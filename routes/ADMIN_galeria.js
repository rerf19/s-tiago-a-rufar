const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const mysql = require('../database');
const {isLoggedIn} = require('../lib/auth')
const {isLoggedInADMIN} = require('../lib/auth')
const helpers = require('../lib/helpers');
const fs = require('fs');

router.get('/', //isLoggedInADMIN , 
async (req,res) => {
    var menu = {} //await mysql.query('SELECT * FROM menus WHERE privilegio = 0');
    var menuAdmin = {} //await mysql.query('SELECT * FROM menus WHERE privilegio = 1');
    var galeria = {} //await mysql.query('SELECT galeria.privilegio,galeria.nome,galeria.tipo,galeria.data,galeria.idImagens,utilizadores.primeiroNome,utilizadores.ultimoNome FROM galeria INNER JOIN utilizadores ON galeria.id_Utilizador = utilizadores.idUtilizadores ORDER BY galeria.idImagens DESC')
    var membroExcluidos = {} //await mysql.query('SELECT * FROM galeria WHERE privilegio = -1')
    var imgP = {} //await mysql.query('SELECT count(*) as count FROM galeria WHERE privilegio = 1 and tipo != "video/mp4"')
    var vidP = {} //await mysql.query('SELECT count(*) as count FROM galeria WHERE privilegio = 1 and tipo = "video/mp4"')
    var img = {} //await mysql.query('SELECT count(*) as count FROM galeria WHERE tipo != "video/mp4"')
    var vid = {} //await mysql.query('SELECT count(*) as count FROM galeria WHERE tipo = "video/mp4"')
    res.render('ADMIN_galeria.ejs',{
        menu,
        menuAdmin,
        galeria,
        membroExcluidos,
        imgP,
        vidP,
        img,
        vid
    });
})

router.post('/options', //isLoggedInADMIN , 
async (req,res) => {
    // var selecionado = req.body.check
    // if(req.body.rebaixar == ''){
    //     for(var i=0; i < selecionado.length; i++){
    //         await mysql.query('UPDATE galeria SET privilegio = 0 WHERE idImagens ="'+selecionado[i]+'"')
    //     }
    // }
    // if(req.body.eliminar == ''){
    //     for(var i=0; i < selecionado.length; i++){
    //         var el = await mysql.query('SELECT nome FROM galeria WHERE idImagens ="'+selecionado[i]+'"')
    //         if(el[0] != []){
    //             fs.unlink('public/imagens/galeria/'+el[0].nome, async (err) =>{
    //                 await mysql.query('DELETE FROM galeria WHERE idImagens ="'+selecionado[i-1]+'" ')
    //             })
    //         }
    //     }
    // }
    // if(req.body.elevar == ''){
    //     for(var i=0; i < selecionado.length; i++){
    //         await mysql.query('UPDATE galeria SET privilegio = 1 WHERE idImagens ="'+selecionado[i]+'" ')
    //     }
    // }
    // if(req.body.aproveitar == ''){
    //     for(var i=0; i < selecionado.length; i++){
    //         await mysql.query('UPDATE galeria SET privilegio = 0,id_Utilizador = "'+req.user.idUtilizadores+'" WHERE idImagens ="'+selecionado[i]+'" ')
    //     }
    // }
    res.redirect('/admin/galeria')
})

router.get('/rebaixar/:id',//isLoggedInADMIN, 
async (req,res) => {
    //await mysql.query('UPDATE galeria SET privilegio = 0 WHERE idImagens ="'+req.params.id+'" ')
    res.redirect('/admin/galeria')
})

router.get('/elevar/:id',//sLoggedInADMIN, 
async (req,res) => {
    //await mysql.query('UPDATE galeria SET privilegio = 1 WHERE idImagens ="'+req.params.id+'" ')
    res.redirect('/admin/galeria')
})


//eliminar
router.get('/eliminar/:id',//isLoggedInADMIN, 
async (req,res) => {
    // var image = await mysql.query('SELECT * FROM galeria WHERE idImagens ="'+req.params.id+'"')
    // fs.unlink('public/imagens/galeria/'+image[0].nome, async (err) =>{
    //     if(err){
    //         console.log(err);
    //         await mysql.query('DELETE FROM galeria WHERE idImagens ="'+req.params.id+'"');
    //     }
    //     else{
    //         await mysql.query('DELETE FROM galeria WHERE idImagens ="'+req.params.id+'"');
    //     }
    // })
    res.redirect('/admin/galeria')
})

router.get('/aproveitar/:id',//isLoggedInADMIN ,
async (req,res) => {
    //await mysql.query('UPDATE galeria SET privilegio = 0, id_Utilizador ="'+req.user.idUtilizadores+'" WHERE idImagens = "'+req.params.id+'"');
    res.redirect('/admin/galeria')
})

module.exports = router;