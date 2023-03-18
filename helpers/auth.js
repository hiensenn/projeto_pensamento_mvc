module.exports.checkAuth = function(req, res, next) {

    const userid = req.session.userid //checa se o usuário está logado

    if(!userid) {
        res.redirect('/login')
    }

    next()

    
}