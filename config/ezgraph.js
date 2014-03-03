var env               =    process.env.NODE_ENV || 'development'
var packageJson       =    require('../package.json')
var path              =    require('path')
var express           =    require('express')
var middleware        =    require('./middleware')
var router            =    require('./router')
var database          =    require('./databaseBootstrap')
var passport          =    require('passport')
var passportStrategy  =    require('./passportStrategy')

console.log ('Loading EZgraph in '+ env +' mode......\n')

global.App = {
    app:        express(),
    port:       process.env.PORT || 3000,
    version:    packageJson.version,
    root:       path.join(__dirname, '..'),
    env:        env,

    appPath: function(path){
        return this.root+'/'+path
    },

    require: function(path){
        return require(this.appPath(path))
    },

    route: function(path) {
     return this.require("application/handlers/"+path)
    },

    model: function(path){
      return this.require("application/models/"+path)
    },

    start: function(){
        if(!this.started){
             this.started=true
             this.app.listen(this.port)
             console.log("Running EZgraph "+App.version+" on port "+App.port+" in "+App.env+" mode")
        }
    }
}

//middleware stack
middleware(App.app, express, path, passport)

//passport config
passportStrategy(App, passport)
//routing
router(App.app, passport)

//jade engine
App.app.set('views', App.appPath('application/views'));
App.app.set('view engine', 'jade');
App.app.set('view options', {pretty: env === 'development' });

//DB bootstrap
database(process.env.DATBASE_URL || 'mongodb://localhost/ezgraph')
