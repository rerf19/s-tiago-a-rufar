// const passport = require('passport');
// const LocalStrategy =  require('passport-local').Strategy;

// const mysql = require('../database');
// const helpers = require('./helpers');
// var nodemailer = require('nodemailer');


//LOGIN
//passport.use('local.login', new LocalStrategy({
//     usernameField: 'loginEmail',
//     passwordField: 'loginPassword',
//     passReqToCallback: true
// }, async (req,loginEmail,loginPassword,done) => {
//     if(req.body.loginEmail != '' || req.body.loginPassword != ''){
//         const rows = await mysql.query('SELECT * FROM utilizadores WHERE email = "'+loginEmail+'"');
//         if(rows.length > 0){
//             const user = rows[0];
//             const validPassword = await helpers.matchPassword(loginPassword,user.pass);
//             if(rows[0].privilegio >= 0){
//                 if(validPassword){
//                     var date = new Date()
//                     var horas = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
//                     var mes = date.getMonth() + 1
//                     var data = date.getDate() +"/"+ mes +"/"+ date.getFullYear()
//                     var utilizador = await mysql.query('SELECT * FROM utilizadores WHERE email = "'+req.body.loginEmail+'"')
//                     await mysql.query('INSERT INTO logins(idUtilizador,data,hora) VALUES ("'+utilizador[0].idUtilizadores+'","'+data+'","'+horas+'")')
//                     return done(null, user); //Entou
//                 }
//                 else{
//                     req.flash('fracasso','loginPassword');//Password incorreta
//                     return done(null);
//                 }
//             }
//             else{
//                 req.flash('fracasso','faltaConfirmacao');
//                 return done(null); //PRIVILEGIO = -1
//             }
//         }
//         else{
//             req.flash('fracasso','loginUtiNaoExiste'); //Email nao existe
//             return done(null);
//         }
        
//     }
//     else{
//         req.flash('fracasso','registarCamposBracos');
//     }
//}));

//REGISTAR
//passport.use('local.registar',new LocalStrategy({
//     usernameField: 'registarEmail',
//     passwordField: 'registarPassword',
//     passReqToCallback: true
// }, async (req,registarEmail,registarPassword,done) => {
    // const {registarPrimeiroNome} = req.body
    // const {registarUltimoNome} = req.body
    // const {registarGenero} = req.body
    // const {registarConfirmarPassword} = req.body
    // const priv = '0'
    // const newUser = {
    //     registarPrimeiroNome,
    //     registarUltimoNome,
    //     registarEmail,
    //     registarGenero,
    //     registarPassword,
    //     priv
    // }
    // if( registarPassword == registarConfirmarPassword ){
    //     if(registarPrimeiroNome == '' || registarUltimoNome == '' || registarEmail == '' || registarGenero == '' || registarPassword == ''){
    //         req.flash('fracasso','registarCamposBracos'); //campos em braco
    //         return done(null);
    //     }
    //     else{
    //         const verificarEmail = await mysql.query('Select * from utilizadores where email = "'+registarEmail+'"');
    //         if(verificarEmail == ''){
    //             newUser.registarPassword = await helpers.encryptPassword(registarPassword);
    //             const res = await mysql.query('INSERT INTO utilizadores (primeiroNome, ultimoNome, email, genero, pass, privilegio,imagem) VALUES ("'+registarPrimeiroNome+'",  "'+registarUltimoNome+'","'+registarEmail+'","'+registarGenero+'","'+newUser.registarPassword+'","-2","default-user.png")');
    //             newUser.idUtilizadores = res.insertId;
    //                 var transporter = nodemailer.createTransport({
    //                 service: 'gmail',
    //                 auth: {
    //                     user: 'testestrstr@gmail.com',
    //                     pass: 'STRstrSTR123'
    //                 }
    //                 });
    //                 var mensagem = '<h3>Registo de Conta</h3><p>Olá,'+registarPrimeiroNome+' '+registarUltimoNome+'!</p> <p>Recebemos a informação de que se quer registar no nosso websit.<br> Antes de o administrador aceitar o seu pedido, tem de confirmar o seu email, apenas clicando no link abaixo.</p><p><a href="http://localhost:3000/verificaremail/'+res.insertId+'">Link! Clica aqui!</a></p><p>Os melhores comprimentos,</p><p>Equipa S.Tiago a Rufar</p>';
    //                 var mailOptions = {
    //                     from: 'testestrstr@gmail.com',
    //                     to: registarEmail, //registarEmail
    //                     subject: 'REGISTO DE CONTA',
    //                     html: mensagem
    //                 };
    //                 transporter.sendMail(mailOptions, function(error, info){
    //                 if (error) {
    //                     console.log(error);
    //                 } else {
    //                     console.log('Email sent: ' + info.response);
    //                 }
    //                 });
    //             req.flash('sucesso','registoSucesso')
    //             return done(null, newUser); //conseguiu registar
    //         }
    //         else{
    //             req.flash('fracasso','emailExistente'); //campos em braco
    //             return done(null);
    //         }
    //     }
    // }
    // else{
    //     req.flash('fracasso','registarPasswords'); //passwords nao correspodem
    //     return done(null); 
    // }
//}));
// -- // -- //
//passport.serializeUser((user,done) =>{
    //done(null, user.idUtilizadores)
//})

//passport.deserializeUser(async (id, done) => {
    //const rows = await mysql.query('SELECT * FROM utilizadores WHERE idUtilizadores = ?', [id]);
    //done(null, rows[0]);
//})