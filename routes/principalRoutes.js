const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');
const helpers = require('../lib/helpers');
//DATABASE
const mysql = require('../database');
const {isNotLoggedIn} = require('../lib/auth')
////////////////////////////////////GET
router.get('/', async (req,res) => {
    var calendario = await mysql.query("SELECT title,color,start,end FROM calendario WHERE privilegio = 1");
    var galeria = await mysql.query('SELECT idImagens,nome FROM galeria WHERE privilegio = 1 AND tipo != "video/mp4"');
    var numeros = []
    var count = 0 
    for(var i=0; i<6 ; i++){
        var rd = Math.floor(Math.random() * galeria.length);
        numeros[i] = rd;
        var stat = true;
        count = 0;
        while( stat ){
            for(var j=0; j<i ; j++){
                if( numeros[i] == numeros[j] ){
                    var rd2 = Math.floor(Math.random() * galeria.length);
                    numeros[i] = rd2;
                    count++;
                }
            }
            if(count > 0 ){
                stat = true;
            }
            else{
                stat = false;
            }
            count = 0;
        }
    }
    res.render('Pindex.ejs',{
        calendario,
        galeria,
        numeros
    });
})

//Verificar Email
router.get('/verificaremail/:id', async (req,res) =>{
    const user = await mysql.query('SELECT * FROM utilizadores WHERE idUtilizadores = "'+req.params.id+'"');
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testestrstr@gmail.com',
        pass: 'STRstrSTR123'
    }
    });
    var mensagem = '<h3>Pedido de Um Novo Utilizador</h3><p>Recebemos a informação que um novo utilizador quer juntar-se à equipa! <br> Responde ao novo membro.</p><p>Nome: '+user[0].primeiroNome+' '+user[0].ultimoNome+', Email: '+user[0].email+'</p><p>Os melhores comprimentos,</p><p>Equipa S.Tiago a Rufar</p>'
    var mailOptions = {
        from: 'testestrstr@gmail.com',
        to: 'testestrstr@gmail.com', //email dos admins
        subject: 'NOVO PEDIDO DE UTILIZADOR',
        html: mensagem
    };
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        //console.log('Email sent: ' + info.response);
    }
    });
    await mysql.query('UPDATE utilizadores SET privilegio = -1 WHERE idUtilizadores = '+req.params.id+'');
    res.render('Pverificado.ejs');
})

//Enviar Email para Recuperação de conta
router.post('/recuperarPassword', async (req,res) => {
    var st = await mysql.query('SELECT idUtilizadores,primeiroNome,ultimoNome FROM utilizadores WHERE email = "'+req.body.email+'" and privilegio >= 0');
    if( st != "" ){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'testestrstr@gmail.com',
                pass: 'STRstrSTR123'
            }
            });
            var mensagem = '<h3>Recuperação da Password</h3><p>Olá,'+st[0].primeiroNome+' '+ st[0].ultimoNome +'!</p><p>Recebemos a informação que pretende recuperar a sua conta. <br> Para tal, terá de clicar no link abaixo e de seguida conseguirá alterar mesma.</p><p><a href="http://localhost:3000/recuperarPassword/'+st[0].idUtilizadores+'">Link</a></p><p>Os melhores comprimentos,</p><p>Equipa S.Tiago a Rufar</p>'
            var mailOptions = {
                from: 'testestrstr@gmail.com',
                to: req.body.email, //req.body.email -- email do utilizador que pretende alterar a sua password
                subject: 'RECUPERAR PASSWORD',
                html: mensagem
            };
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                //console.log('Email sent: ' + info.response);
                req.flash('sucesso','passEnv');
            }
            });
    }
    res.redirect('/')
})

//Página de alteração de password
router.get('/recuperarPassword/:id',async (req,res) => {
    var idUser = req.params.id;
    res.render('PnewPassword.ejs',{
        idUser
    });
})

//Alterar a password a um utilizador
router.post('/alterarPassword', async (req,res) => {
    if(req.body.password == req.body.Cpassword){
        var nova = req.body.password;
        const nova2= await helpers.encryptPassword(nova);
        await mysql.query('UPDATE utilizadores SET pass="'+nova2+'" WHERE idUtilizadores="'+req.body.id+'"');
        req.flash('sucesso','sucessoPassword');
    }
    else{
        req.flash('fracasso','registarPasswords');
    }
    res.redirect('/');
})

//Pagina Galeria Principal
router.get('/galeria', async (req,res) => {
    var galeria = await mysql.query('SELECT * FROM galeria WHERE privilegio = 1 ORDER BY idImagens DESC');
    res.render('Pgaleria.ejs',{
        galeria
    })
})

//Enviar Mensagem...
router.post('/mensagem', async (req,res) => {
    res.redirect('/');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testestrstr@gmail.com',
            pass: 'STRstrSTR123'
        }
        });
        var mensagem = '<h3>Recebeu uma Mensagem!</h3><p>Nome: '+req.body.nome+'</p><p>Email: '+req.body.email+'</p><p>Assunto: '+req.body.assunto+'</p><p>Mensagem: </p><p>'+req.body.mensagem+'</p>'
        var mailOptions = {
            from: 'testestrstr@gmail.com',
            to: 'testestrstr@gmail.com',
            subject: 'NOVA MENSAGEM',
            html: mensagem
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            //console.log('Email sent: ' + info.response);
        }
    });
    var transporter2 = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testestrstr@gmail.com',
            pass: 'STRstrSTR123'
        }
        });
        var mensagem = '<h3>Enviou uma mensagem</h3><p>Olá,'+req.body.nome+'!</p><p>Recebemos a sua mensagem, iremos responder o mais rápido possivel.</p><p>Os melhores comprimentos,</p><p>Equipa S.Tiago a Rufar</p>'
        var mailOptions = {
            from: 'testestrstr@gmail.com',
            to: req.body.email,
            subject: 'MENSAGEM ENVIADA',
            html: mensagem
    };
    transporter2.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            //console.log('Email sent: ' + info.response);
        }
    });
})

//Entrada na newsletter
router.post('/newsletter',async (req,res)=>{
    await mysql.query('INSERT INTO newsletter (email) VALUE ("'+req.body.email+'")')
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testestrstr@gmail.com',
            pass: 'STRstrSTR123'
        }
        });
        var mensagem = '<h3>Newsletter!</h3><p>Olá!</p><p>Recebemos a informação de que quer receber a nossa newsletter. <br> Agradecemos o seu apoio.</p><p>Os melhores comprimentos,</p><p>Equipa S.Tiago a Rufar</p>'
        var mailOptions = {
            from: 'testestrstr@gmail.com',
            to: req.body.email,
            subject: 'NEWSLETTER STR',
            html: mensagem
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            //console.log('Email sent: ' + info.response);
        }
    });
    res.redirect('/');
})




module.exports = router;
