module.exports = function (app, express, path, passport){
	var flash = require('connect-flash')

	app.use(express.favicon('../public/images/favicon.ico'))
	app.use(express.logger('dev'))
	app.use(express.json())
	app.use(express.urlencoded())
	app.use(express.methodOverride())
	app.use(express.bodyParser())
	app.use(express.cookieParser('your secret here'))
	app.use(express.session({ secret: 'super-duper-secret-secret' }))
	app.use(flash())
	app.use(require('stylus').middleware({ src: __dirname + '/ezgraph/public' }))
	app.use(express.static(App.appPath('public')))
	app.use(passport.initialize())
	app.use(passport.session())

	if (App.env === 'developemnt'){
  		app.use( express.errorHandler())
	}
 }