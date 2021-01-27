const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const mysql = require('../database');
const {isLoggedIn} = require('../lib/auth')
const {isLoggedInADMIN} = require('../lib/auth')
const helpers = require('../lib/helpers');
const fs = require('fs');
var nodemailer = require('nodemailer');

router.get('/', isLoggedInADMIN , async (req,res) => {
    var date = new Date();
    var mes = date.getMonth() + 1
    var data = date.getDate()+"/"+ mes +"/"+ date.getFullYear()
    var menu = await mysql.query('SELECT * FROM menus WHERE privilegio = 0');
    var menuAdmin = await mysql.query('SELECT * FROM menus WHERE privilegio = 1');
    var users = await mysql.query('SELECT * FROM utilizadores ORDER BY primeiroNome ASC');
    var userN = await mysql.query('SELECT count(*) as count FROM utilizadores WHERE privilegio >= 0');
    var clogins = await mysql.query('SELECT count(*) as count FROM logins');
    var cclogins = await mysql.query('SELECT count(*) as count FROM logins WHERE data = "'+data+'"');
    var logins = await mysql.query('SELECT logins.hora,logins.data,utilizadores.primeiroNome,utilizadores.ultimoNome,utilizadores.email FROM logins INNER JOIN utilizadores ON utilizadores.idUtilizadores = logins.idUtilizador ORDER BY logins.idLogin DESC');
    res.render('ADMIN_perfil.ejs',{
        menu,
        menuAdmin,
        users,
        userN,
        clogins,
        cclogins,
        logins
    });
})

router.get('/aceitar/:id', isLoggedInADMIN,async (req,res)=>{
    await mysql.query('UPDATE utilizadores SET privilegio = 0 WHERE idUtilizadores = "'+req.params.id+'"');
    var user = await mysql.query('SELECT * FROM utilizadores WHERE idUtilizadores = "'+req.params.id+'"');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testestrstr@gmail.com',
            pass: 'STRstrSTR123'
        }
        });
        var mensagem = '<h3>Aceitado!</h3><p>Olá,'+user[0].primeiroNome+' '+user[0].ultimoNome+'!</p><p>Benvindo! O administrador já aceitou o seu pedido. <br> Agora já fazes parte dos S.Tiago a Rufar!!</p><p>Os melhores comprimentos,</p><p>Equipa S.Tiago a Rufar</p>'
        var mailOptions = {
            from: 'testestrstr@gmail.com',
            to: user[0].email,
            subject: 'ACEITADO!',
            html: mensagem
        };
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
    res.redirect('/admin/perfil');
})

router.get('/eliminar/:id', isLoggedInADMIN ,async (req,res) =>{
    await mysql.query('UPDATE galeria SET privilegio = -1 WHERE id_Utilizador = "'+req.params.id+'"');
    await mysql.query('DELETE FROM utilizadores WHERE idUtilizadores = '+req.params.id+'');
    await mysql.query('DELETE FROM logins WHERE idUtilizador = "'+req.params.id+'"')
    var imgPerfil = mysql.query('SELECT imagem FROM utilizadores WHERE idUtilizadores = "'+req.params.id+'"');
    if(imgPerfil[0] != "default-user.png"){
        fs.unlink("public/imagens/perfil/" + imgPerfil[0], async(err) => {
            if(err){
                console.log(err);
            }
            else{
            }
        });
    }
    res.redirect('/admin/perfil');
})

router.get('/:id', isLoggedInADMIN,async (req,res) =>{
    var menu = await mysql.query('SELECT * FROM menus WHERE privilegio = 0');
    var menuAdmin = await mysql.query('SELECT * FROM menus WHERE privilegio = 1');
    var users = await mysql.query('SELECT * FROM utilizadores WHERE idUtilizadores = "'+req.params.id+'"');
    res.render('ADMIN_perfilEdit.ejs',{
        menu,
        menuAdmin,
        users
    })
})

router.post('/edit', isLoggedInADMIN,async (req,res) =>{
    await mysql.query('UPDATE utilizadores SET primeiroNome="'+req.body.primeiroNome+'",ultimoNome="'+req.body.ultimoNome+'",email="'+req.body.email+'",genero="'+req.body.genero+'",dataNascimento="'+req.body.dataNascimento+'",residencia="'+req.body.residencia+'",morada="'+req.body.morada+'",contacto="'+req.body.contacto+'",contactoPai="'+req.body.contactoPai+'",contactoMae="'+req.body.contactoMae+'",contactoCasa="'+req.body.contactoCasa+'" WHERE idUtilizadores = "'+req.body.idUtilizadores+'"')
    res.redirect('/admin/perfil')
})

router.post('/editt', isLoggedInADMIN,async (req,res) =>{
    await mysql.query('UPDATE utilizadores SET tamanhoCamisola="'+req.body.tamanhoCamisola+'",tamanhoCalcado="'+req.body.tamanhoCalcado+'",sandalias="'+req.body.sandalias +'",botas="'+req.body.botas+'",polo="'+req.body.polo+'",trajeMediaval="'+req.body.trajeMediaval+'",trajeRomano="'+req.body.trajeRomano+'" WHERE idUtilizadores ="'+req.body.idUtilizadores+'"');
    res.redirect('/admin/perfil')
})

router.post('/edittt', isLoggedInADMIN,async (req,res) =>{
    await mysql.query('UPDATE utilizadores SET privilegio = "'+req.body.privilegio+'" WHERE idUtilizadores = "'+req.body.idUtilizadores+'" ');
    res.redirect('/admin/perfil')
})



module.exports = router;