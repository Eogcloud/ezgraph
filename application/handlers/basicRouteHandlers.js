var userModel = App.model('userModel')

exports.getAbout    =   getAbout
exports.notFound    =   notFound
exports.getHome     =   getHome
exports.getHelp     =   getHelp
exports.getFaq      =   getFaq

function getAbout(req, res){
    res.render('about', {
                            title: 'EZgraph |  About',
                            user: req.user})
}

function notFound(req, res){
    res.render('404', {
                            title: 'EZgraph |  Page Not Found',
                            user: req.user})
}

function getHome(req, res){
    res.render('home', {
                            title: 'EZgraph |  Home',
                            user: req.user})
}

function getHelp(req, res){
    res.render('help', {
                            title: 'EZgraph |  Help',
                            user: req.user})
}

function getFaq(req, res){
    res.render('faq', {
                            title: 'EZgraph |  FAQ',
                            user: req.user})
}
