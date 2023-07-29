//module.exports = {
    //    isLoggedIn(req,res,next){
    //     if(req.isAuthenticated() && req.user.privilegio >= 0){
    //         return next();
    //     }
    //        return res.redirect('/');
    // },
    // isLoggedInADMIN(req,res,next){
    //     if(req.isAuthenticated() && req.user.privilegio == 1){
    //         return next();
    //     }
    //     return res.redirect('*');
    // },
    // isNotLoggedIn(req,res,next){
    //     if(!req.isAuthenticated()){
    //         return next();
    //     }
    //     else{
    //         return res.redirect('/user');
    //     }
    // }
//}