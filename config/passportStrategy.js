module.exports = function (App, passport){
    var userModel       =   App.model('userModel')
    var LocalStrategy   =   require('passport-local').Strategy

    passport.serializeUser(
        function(user, done){
            done(null, user.id)
        }
    )

    passport.deserializeUser(function(id, done){
        userModel.findById(id, function(err, user) {
            done(err, user)
        })
    })

    passport.use('login', new LocalStrategy({usernameField: 'user', passwordField: 'pass', passReqToCallback: true},
        function(req, username, password, done){
            userModel.findOne({ email :  username }, function(err, user) {
                if (err){
                    return done(err)
                }
                if (!user){
                    return done(null, false, req.flash('loginMessage', 'Invalid login details!'))
                }
                if (!user.validPassword(password)){
                    return done(null, false, req.flash('loginMessage', 'Invalid login details!'))
                }
                else{
                    return done(null, user)
                }
        })}))

    passport.use('signup', new LocalStrategy( { usernameField: 'user', passwordField: 'pass', passReqToCallback : true},
        function(req, username, password, done){
            process.nextTick(function(){
                //if user exists
                userModel.findOne({ email :  username }, function(err, user) {
                    if (err){
                        return done(err)
                    }

                    // check email exists
                    if (user){
                        return done(null, false, req.flash('signupMessage', 'That email is already in use!'));
                    }
                    else{
                        var newUser = new userModel();
                        newUser.email = username;
                        newUser.hashedPassword = newUser.generateHash(password);

                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                throw err
                            }
                            return done(null, newUser)
                        })
                }})})}))
}
