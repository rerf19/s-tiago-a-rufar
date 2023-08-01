const express = require('express');                                                      //EXPRESS
const morgan = require('morgan');                                                        //MORGAN
const helmet = require('helmet');                                                        //HELMET
const crypto = require('crypto');                                                        //CRYPTO
const bodyParser = require('body-parser')                                                //BODY-PARSER
const flash = require('connect-flash')                                                   //FLASH
//const session = require('express-session');
//const MYSQLStore = require('express-mysql-session');
//const passport = require('passport');

//INITIALIZATIONS
const app = express();
//app.use(bodyParser.json())
//require('./lib/passport.js');

//DEFENIÇOES
app.set('port',3000);                                                                    //PORTA DO SERVIDOR
app.set('views', __dirname + '/views');                                                  //VIEW ENGINE
app.set('view engine','ejs');                                                            //
app.use(express.json());                                                                 //EXPRESS CONSEGUIR LER JSON VARIAVEIS JS


//PUBLICO
app.use(express.static(__dirname + '/public'));                                          //PARA PUDER UTILIZAR FICHEIROS CSS,JS e IMAGENS

//MIDDLEWARES
// const {database} = require('./keys.js')
// app.use(session({
// 	secret: 'saotiagoarufar',
// 	resave: false,
// 	saveUninitialized: false
// 	//store: new MYSQLStore(database)
// }));

//app.use(flash());
//app.use(morgan('tiny'))
//app.use(helmet());
//app.use(helmet.permittedCrossDomainPolicies());
//app.use(helmet.noCache());
// app.use(
// 	helmet.featurePolicy({
// 		features : {
// 			fullscreen    : [ "'none'" ],
// 			vibrate       : [ "'none'" ],
// 			syncXhr       : [ "'none'" ],
// 			microphone    : [ "'none'" ],
// 			accelerometer : [ "'none'" ],
// 			camera        : [ "'none'" ]
// 		}
// 	})
// );
app.use(bodyParser.urlencoded({extended: false}));
//app.use(passport.initialize());
//app.use(passport.session());
//VARIAVEIS GLOBAIS
app.set('Name','Rodrigo Ferreira');                                                      //NOME DO DESENVOLVEDOR
// app.use((req,res,next) => {
// 	app.locals.sucesso = req.flash('sucesso');  //variavel registado com sucesso
// 	app.locals.fracasso = req.flash('fracasso'); //fracasso no login e no registar
// 	app.locals.sAltPass = req.flash('sAltPass'); //sucesso a alterar password
// 	app.locals.fAltPass = req.flash('fAltPass'); //fracasso ao alterar password
// 	app.locals.fAltFoto = req.flash('fAltFoto'); //fracasso ao alterar foto de perfil (imagem não suportada)
// 	app.locals.user = req.user; //variaveis locais do utilizador
// 	next();
// })


//ROTAS
app.use(require('./routes/principalRoutes.js'));
app.use(require('./routes/authentication.js'));
app.use('/user',require('./routes/USER_profile.js'));
app.use('/user/galeria',require('./routes/USER_gallary.js'));
app.use('/user/calendario',require('./routes/USER_calendar.js'));
app.use('/admin/perfil',require('./routes/ADMIN_perfil.js'));
app.use('/admin/galeria',require('./routes/ADMIN_galeria.js'));
app.use('/admin/calendario',require('./routes/ADMIN_calendario.js'));
app.get('*', (req,res) => {
	res.render("404.ejs");
})

//ABRIR O SERVIDOR
app.listen(app.get('port'), () => {
	// console.log('Server running on port',app.get('port'))
	// console.log('http://localhost:3000');
	console.log('Developer:',app.get('Name'));
});