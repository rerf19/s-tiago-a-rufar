const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const mysql = require('../database');
const {isLoggedIn} = require('../lib/auth')
const {isNotLoggedIn} = require('../lib/auth')
const helpers = require('../lib/helpers');
const fs = require('fs');


//MULTER
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/imagens/perfil")
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    fileFilter: function (req,file,cb) {
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Erro: Apenas Aceitamos Imagens do tipo JPEG, JPG e PNG");
    }
})

//GET
router.get('/perfil', isLoggedIn , async (req,res) => {
    var menu = await mysql.query('SELECT * FROM menus WHERE privilegio = 0');
    var menuAdmin = await mysql.query('SELECT * FROM menus WHERE privilegio = 1');
    res.render('USER_profile.ejs',{
        menu,
        menuAdmin
    });
})

router.get('/logout',(req,res) => {
    req.logOut();
    res.redirect('/');
})

//POST


//informaçao pessoal
router.post('/infPessoal', isLoggedIn , async (req,res,next) => {
    await mysql.query('UPDATE utilizadores SET primeiroNome="'+req.body.primeiroNome+'",ultimoNome="'+req.body.ultimoNome+'",email="'+req.body.email+'",genero="'+req.body.genero+'",dataNascimento="'+req.body.dataNascimento+'",residencia="'+req.body.residencia+'",morada="'+req.body.morada+'",contacto="'+req.body.contacto+'",contactoPai="'+req.body.contactoPai+'",contactoMae="'+req.body.contactoMae+'",contactoCasa="'+req.body.contactoCasa+'" WHERE idUtilizadores = "'+req.body.idUtilizadores+'"')
    res.redirect('/user/perfil')
})


//vestimenta
router.post('/vestimenta', isLoggedIn , async (req,res,next) => {
    await mysql.query('UPDATE utilizadores SET tamanhoCamisola="'+req.body.tamanhoCamisola+'",tamanhoCalcado="'+req.body.tamanhoCalcado+'",sandalias="'+req.body.sandalias +'",botas="'+req.body.botas+'",polo="'+req.body.polo+'",trajeMediaval="'+req.body.trajeMediaval+'",trajeRomano="'+req.body.trajeRomano+'" WHERE idUtilizadores ="'+req.body.idUtilizadores+'"');
    res.redirect('/user/perfil')
})

//alterar password
router.post('/altPass', isLoggedIn , async (req,res,next) => {
    const nova = req.body.passNova;
    const antiga = req.body.passAnt;
    const validPassword = await helpers.matchPassword(antiga,req.body.password);
    if(validPassword){
        const nova2= await helpers.encryptPassword(nova);
        await mysql.query('UPDATE utilizadores SET pass="'+nova2+'" WHERE idUtilizadores="'+req.body.idUtilizadores+'"');
        req.flash('sAltPass','Password Alterada com Sucesso!');
    }
    else{
        req.flash('fAltPass','Password Antiga Errada!',);
    }
    res.redirect('/user/perfil');
})

// alterar foto de perfil
router.post('/altFoto', isLoggedIn , upload.single("file"),async (req,res,next) => {
    console.log(req.user.imagem)
    if(req.user.imagem != "default-user.png"){
        fs.unlink("public/imagens/perfil/" + req.user.imagem, async(err) => {
            if(err){
                console.log(err);
                await mysql.query('UPDATE utilizadores SET imagem = "'+req.file.filename+'" WHERE idUtilizadores="'+req.user.idUtilizadores+'"');
            }
            else{
                await mysql.query('UPDATE utilizadores SET imagem = "'+req.file.filename+'" WHERE idUtilizadores="'+req.user.idUtilizadores+'"');
            }
        });
    }
    else{
        await mysql.query('UPDATE utilizadores SET imagem = "'+req.file.filename+'" WHERE idUtilizadores="'+req.user.idUtilizadores+'"');
    }
    res.redirect('/user/perfil');
})



module.exports = router;