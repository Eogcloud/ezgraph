module.exports = function(app, passport){

    var graphRouteHandlers   = App.route('graphRouteHandlers')
    var basicRouteHandlers   = App.route('basicRouteHandlers')
    var accountRouteHandlers = App.route('accountRouteHandlers')

      //==========================//
     //       Account Routing    //
    //==========================//
        app.get('/profile', loggedIn, accountRouteHandlers.getProfile)

        app.get('/login', accountRouteHandlers.getLogin)
        app.post('/login',  passport.authenticate('login', {
            successRedirect : '/profile',
            failureRedirect : '/login',
            failureFlash : true}))

        app.get('/logout', accountRouteHandlers.getLogout)

        app.get('/signup', accountRouteHandlers.getSignup)
        app.post('/signup', passport.authenticate('signup', {
            successRedirect : '/profile',
            failureRedirect : '/signup',
            failureFlash : true}))

      //==========================//
     //       Graph Routing      //
    //==========================//
        app.get('/graphing', loggedIn, graphRouteHandlers.getGraphing)
        app.get('/barchartentry', loggedIn, graphRouteHandlers.getBarchartentry)
        app.post('/barchartentry', graphRouteHandlers.postBarchartentry)
        app.get('/import', loggedIn, graphRouteHandlers.getImport)
        app.get('/piechartentry', loggedIn, graphRouteHandlers.getPieChartEntry)
        app.post('/piechartentry', loggedIn, graphRouteHandlers.postPieChartEntry)
        app.post('/import', loggedIn, graphRouteHandlers.postImport)
        app.post('/pieChart', loggedIn, graphRouteHandlers.postPieChart)

      //==========================//
     //       Basic Routing      //
    //==========================//
        app.get('/', basicRouteHandlers.getHome)
        app.get('/home', basicRouteHandlers.getHome)
        app.get('/about', basicRouteHandlers.getAbout)
        app.get('/help', basicRouteHandlers.getHelp)
        app.get('/faq', basicRouteHandlers.getFaq)
        app.get('*', basicRouteHandlers.notFound)

      //==========================//
     //       Auth Middleware    //
    //==========================//
        function loggedIn(req, res, next) {
            if (req.isAuthenticated()){
                return next()
            }
            else{
                res.redirect('/login')
            }
        }
}