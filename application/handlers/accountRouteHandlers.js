var userModel =  App.model('userModel')

exports.getLogin    =   getLogin
exports.getSignup   =   getSignup
exports.getLogout   =   getLogout
exports.getProfile  =   getProfile

function getProfile(req, res){
    res.render('profile', { title: 'EZgraph |  User Home'})
}

function getLogin(req, res){
    if(req.user!=null){
        res.redirect('profile')
    }

    res.render('login', { title: 'EZgraph |  Log In', message: req.flash('loginMessage') })
}

function getSignup(req, res) {
    if(req.user!=null){
        res.redirect('profile')
    }

    res.render('signup', { title: 'EZgraph |  Sign Up', message: req.flash('signupMessage') })
}

function getLogout(req, res){
    req.logout()
    res.redirect('/login')
}

