const express = require('express');
const router = express.Router();
const fs = require('fs');

const multer = require('multer');
const path = require('path');
// const mysql = require('../database');
// const {isLoggedIn} = require('../lib/auth')
// const {isNotLoggedIn} = require('../lib/auth')
// const helpers = require('../lib/helpers');

//MULTER
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/imagens/galeria")
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage,
    fileFilter: function (req,file,cb) {
        var filetypes = /jpeg|jpg|png|mp4/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Erro: Apenas Aceitamos Imagens ou Videos do tipo JPEG, JPG, PNG ou MP4");
    }
})

//Entrar na página
router.get('/', //isLoggedIn , 
async (req,res) => {
    var menu = {} //await mysql.query('SELECT * FROM menus WHERE privilegio = 0');
    var menuAdmin = {} //await mysql.query('SELECT * FROM menus WHERE privilegio = 1');
    const userFoto = {} //await mysql.query('SELECT galeria.nome,galeria.data,galeria.idImagens,utilizadores.primeiroNome,utilizadores.ultimoNome FROM galeria INNER JOIN utilizadores ON galeria.id_Utilizador = utilizadores.idUtilizadores WHERE galeria.id_Utilizador ="'+req.user.idUtilizadores+'" AND galeria.tipo != "video/mp4" ORDER BY galeria.idImagens DESC ');
    const userVideos = {} //await mysql.query('SELECT galeria.nome,galeria.data,galeria.idImagens,utilizadores.primeiroNome,utilizadores.ultimoNome FROM galeria INNER JOIN utilizadores ON galeria.id_Utilizador = utilizadores.idUtilizadores WHERE galeria.id_Utilizador ="'+req.user.idUtilizadores+'" AND galeria.tipo = "video/mp4" ORDER BY galeria.idImagens DESC')
    const allFoto = {} //await mysql.query('SELECT nome,idImagens,data FROM galeria WHERE id_Utilizador = "0" ');
    const utilizadores = {} //await mysql.query('SELECT idUtilizadores,primeiroNome,ultimoNome FROM utilizadores WHERE idUtilizadores != "'+req.user.idUtilizadores+'"  and privilegio >= 0');
    res.render('USER_gallary.ejs', {
        userFoto,
        allFoto,
        utilizadores,
        userVideos,
        menu,
        menuAdmin
    });
})

//Enviar Fotografias e/ou videos
router.post('/envFoto', //isLoggedIn, 
upload.fields([{ name: 'file', maxCount: 40 }]),async (req,res,next) => {
    // var dateObj = new Date();
    // var month = dateObj.getUTCMonth() + 1;
    // var day = dateObj.getUTCDate();
    // var year = dateObj.getUTCFullYear();
    // var data = day +'/' + month+ '/'+year;
    // for(var i=0;i<40;i++){
    //     if(req.files['file'][i] !== undefined){
    //         await mysql.query('INSERT INTO galeria (nome,id_Utilizador,data,tipo) VALUES("'+req.files['file'][i].filename+'","'+req.user.idUtilizadores+'","'+data+'","'+req.files['file'][i].mimetype+'")')
    //     }
    // }
    res.redirect('/user/galeria');
})

//Eliminar Imagens ou Video do Utilizador e Video
router.get('/eliminar/:id', async (req,res) =>{
    // var image = await mysql.query('SELECT * FROM galeria WHERE idImagens ="'+req.params.id+'"')
    // fs.unlink('public/imagens/galeria/'+image[0].nome, async (err) =>{
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         await mysql.query('DELETE FROM galeria WHERE idImagens ="'+req.params.id+'"');
    //     }
    // } )
    res.redirect('/user/galeria');
})

//Pesquisar em todas as imagens e videos pelo nome
router.get('/pesqNome', //isLoggedIn ,
async (req,res) =>{
    //var query = require('url').parse(req.url,true).query;
    var menu = {} //await mysql.query('SELECT * FROM menus WHERE privilegio = 0');
    var menuAdmin = {} //await mysql.query('SELECT * FROM menus WHERE privilegio = 1');
    const userFoto = {} //await mysql.query('SELECT galeria.nome,galeria.data,galeria.idImagens,utilizadores.primeiroNome,utilizadores.ultimoNome FROM galeria INNER JOIN utilizadores ON galeria.id_Utilizador = utilizadores.idUtilizadores WHERE galeria.id_Utilizador ="'+req.user.idUtilizadores+'" AND galeria.tipo != "video/mp4" ORDER BY galeria.idImagens DESC');
    const userVideos = {} //await mysql.query('SELECT galeria.nome,galeria.data,galeria.idImagens,utilizadores.primeiroNome,utilizadores.ultimoNome FROM galeria INNER JOIN utilizadores ON galeria.id_Utilizador = utilizadores.idUtilizadores WHERE galeria.id_Utilizador ="'+req.user.idUtilizadores+'" AND galeria.tipo = "video/mp4" ORDER BY galeria.idImagens DESC')
    const allFoto = {} //await mysql.query('SELECT galeria.nome,galeria.data,galeria.idImagens,utilizadores.primeiroNome,utilizadores.ultimoNome FROM galeria INNER JOIN utilizadores ON galeria.id_Utilizador = utilizadores.idUtilizadores WHERE id_Utilizador = "'+query.id+'" AND galeria.tipo != "video/mp4" ORDER BY galeria.idImagens DESC');
    const allVideos = {} //await mysql.query('SELECT galeria.nome,galeria.data,galeria.idImagens,utilizadores.primeiroNome,utilizadores.ultimoNome FROM galeria INNER JOIN utilizadores ON galeria.id_Utilizador = utilizadores.idUtilizadores WHERE id_Utilizador = "'+query.id+'" AND galeria.tipo = "video/mp4" ORDER BY galeria.idImagens DESC')
    const utilizadores = {} //await mysql.query('SELECT idUtilizadores,primeiroNome,ultimoNome FROM utilizadores WHERE idUtilizadores != "'+req.user.idUtilizadores+'"  and privilegio >= 0');
    res.render('USER_gallary2.ejs', {
        userFoto,
        allFoto,
        utilizadores,
        userVideos,
        allVideos,
        menu,
        menuAdmin
    });
})

//Pesquisar em todas as imagens e videos pelo data
router.get('/pesqData', //isLoggedIn ,
async (req,res) =>{
    //var query = require('url').parse(req.url,true).query;
    var menu = {}//await mysql.query('SELECT * FROM menus WHERE privilegio = 0');
    var menuAdmin = {}//await mysql.query('SELECT * FROM menus WHERE privilegio = 1');
    const userFoto = {}//await mysql.query('SELECT galeria.nome,galeria.data,galeria.idImagens,utilizadores.primeiroNome,utilizadores.ultimoNome FROM galeria INNER JOIN utilizadores ON galeria.id_Utilizador = utilizadores.idUtilizadores WHERE galeria.id_Utilizador ="'+req.user.idUtilizadores+'" AND galeria.tipo != "video/mp4" ORDER BY galeria.idImagens DESC');
    const userVideos = {}//await mysql.query('SELECT galeria.nome,galeria.data,galeria.idImagens,utilizadores.primeiroNome,utilizadores.ultimoNome FROM galeria INNER JOIN utilizadores ON galeria.id_Utilizador = utilizadores.idUtilizadores WHERE galeria.id_Utilizador ="'+req.user.idUtilizadores+'" AND galeria.tipo = "video/mp4" ORDER BY galeria.idImagens DESC')
    var allFoto = {}//await mysql.query('SELECT galeria.nome,galeria.data,galeria.idImagens,utilizadores.primeiroNome,utilizadores.ultimoNome FROM galeria INNER JOIN utilizadores ON galeria.id_Utilizador = utilizadores.idUtilizadores WHERE data2 >= "'+query.data1+'" AND data2 <= "'+query.data2+'" AND id_Utilizador !="'+req.user.idUtilizadores+'" AND galeria.privilegio >= 0 AND galeria.tipo != "video/mp4" ORDER BY galeria.idImagens DESC');
    var allVideos = {}//await mysql.query('SELECT galeria.nome,galeria.data,galeria.idImagens,utilizadores.primeiroNome,utilizadores.ultimoNome FROM galeria INNER JOIN utilizadores ON galeria.id_Utilizador = utilizadores.idUtilizadores WHERE data2 >= "'+query.data1+'" AND data2 <= "'+query.data2+'" AND id_Utilizador !="'+req.user.idUtilizadores+'" AND galeria.privilegio >= 0 AND galeria.tipo = "video/mp4" ORDER BY galeria.idImagens DESC');
    const utilizadores = {}//await mysql.query('SELECT idUtilizadores,primeiroNome,ultimoNome FROM utilizadores WHERE idUtilizadores != "'+req.user.idUtilizadores+'" and privilegio >= 0');
    res.render('USER_gallary2.ejs', {
        userFoto,
        allFoto,
        utilizadores,
        userVideos,
        allVideos,
        menu,
        menuAdmin
    });
})

//Pesquisar Todas as Imagens e Videos
router.get('/pesqToda', //isLoggedIn ,
async (req,res) =>{
    var menu = {}//await mysql.query('SELECT * FROM menus WHERE privilegio = 0');
    var menuAdmin = {}//await mysql.query('SELECT * FROM menus WHERE privilegio = 1');
    const userFoto = {}//await mysql.query('SELECT galeria.nome,galeria.data,galeria.idImagens,utilizadores.primeiroNome,utilizadores.ultimoNome FROM galeria INNER JOIN utilizadores ON galeria.id_Utilizador = utilizadores.idUtilizadores WHERE galeria.id_Utilizador ="'+req.user.idUtilizadores+'" AND galeria.tipo != "video/mp4" ORDER BY galeria.idImagens DESC');
    const userVideos = {}//await mysql.query('SELECT galeria.nome,galeria.data,galeria.idImagens,utilizadores.primeiroNome,utilizadores.ultimoNome FROM galeria INNER JOIN utilizadores ON galeria.id_Utilizador = utilizadores.idUtilizadores WHERE galeria.id_Utilizador ="'+req.user.idUtilizadores+'" AND galeria.tipo = "video/mp4" ORDER BY galeria.idImagens DESC ')
    var allFoto = {}//await mysql.query('SELECT galeria.nome,galeria.data,galeria.idImagens,utilizadores.primeiroNome,utilizadores.ultimoNome FROM galeria LEFT JOIN utilizadores ON galeria.id_Utilizador = utilizadores.idUtilizadores WHERE galeria.id_Utilizador !="'+req.user.idUtilizadores+'" AND galeria.privilegio >= 0 AND galeria.tipo != "video/mp4" ORDER BY galeria.idImagens DESC');
    var allVideos = {}//await mysql.query('SELECT galeria.nome,galeria.data,galeria.idImagens,utilizadores.primeiroNome,utilizadores.ultimoNome FROM galeria INNER JOIN utilizadores ON galeria.id_Utilizador = utilizadores.idUtilizadores WHERE galeria.id_Utilizador !="'+req.user.idUtilizadores+'" AND galeria.privilegio >= 0 AND galeria.tipo = "video/mp4" ORDER BY galeria.idImagens DESC');
    const utilizadores = {}//await mysql.query('SELECT idUtilizadores,primeiroNome,ultimoNome FROM utilizadores WHERE idUtilizadores != "'+req.user.idUtilizadores+'"  and privilegio >= 0');
    res.render('USER_gallary2.ejs', {
        userFoto,
        allFoto,
        utilizadores,
        userVideos,
        allVideos,
        menu,
        menuAdmin
    });
})

module.exports = router;