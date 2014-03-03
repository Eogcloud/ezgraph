var accountManager = require('./modules/account-manager');
var emailManager = require('./modules/email-dispatcher');

module.exports = function(app)
{
	app.get('/login', function(req, res)
	{
		// check if the user's credentials are saved in a cookie //
	   if (req.cookies.email == undefined || req.cookies.pass == undefined)
	   {
	      res.render('login',{locals: { title: 'EZgraph Login'}});
	   } 
	   else
	   {
	   	  // attempt automatic login //
	      accountManager.autoLogin(req.cookies.email, req.cookies.pass, function(o)
	      {
	         if (o != null)
	         {
	            req.session.email = o;
	            res.redirect('./LoggedIn/userHome');
	         }  
	         else
	         {
	            res.render('login',{locals: {title: 'EZgraph Login'}});
	         }
	      });
	   }
	});

	app.post('/login', function(req, res)
	{
		accountManager.manualLogin(req.param('email'), req.param('pass'), function(e, o)
		{
				if (!o)
				{
					res.send(e, 400);
				}	
				
				else
				{
				    req.session.email = o;
					if (req.param('remember-me') == 'true')
					{
						res.cookie('email', o.email, { maxAge: 900000 });
						res.cookie('pass', o.pass, { maxAge: 900000 });
					}
					res.send(o, 200);
			}
		});
	});
		
	app.get('/about', function(req, res)
	{
		res.render('about', {locals: {title : 'about'}});
	});

	app.get('/', function(req, res)
	{
		res.render('home', {locals: {title : 'home'}});
	});

	app.get('/home', function(req, res)
	{
		if (req.cookie.email == null) 
		{
			res.render('home', {locals :{title : 'home'}});
		};
		else
		{
			res.render('userHome', {locals :{title : 'home'}});
		}
	});
		
	app.post('/home', function(req, res)
	{
			if (req.param('email') != undefined) 
			{
				accountManager.updateAccount({email:req.param('email'),	pass:req.param('pass')}, function(e, o)
				{
					if (e)
					{
						res.send('error-updating-account', 400);
					}	
					else
					{
						req.session.email = o;
				// update the user's login cookies if they exists //
						if (req.cookies.email != undefined && req.cookies.pass != undefined){
							res.cookie('email', o.email, { maxAge: 900000 });
							res.cookie('pass', o.pass, { maxAge: 900000 });	
						}
						res.send('ok', 200);
					}
				});
			}	
			else if (req.param('logout') == 'true')
			{
				res.clearCookie('email');
				res.clearCookie('pass');
				req.session.destroy(function(e){res.send('ok', 200);});
			}
	});
		
	// creating new accounts //	
	app.get('/signup', function(req, res) 
	{
		res.render('signup', {title: 'Signup'});
	});
		
	app.post('/signup', function(req, res)
	{
		accountManager.addNewAccount({email:req.param('email'),	pass:req.param('pass')}, 
		function(e)
		{
			if (e)
			{
				res.send(e, 400);
			}	
			else
			{
				res.send('ok', 200);
			}
		});
	});

	// password reset //
	app.post('/lost-password', function(req, res)
	{
		// look up the user's account via their email //
			accountManager.getAccountByEmail(req.param('email'), function(o)
			{
				if (o)
				{
					res.send('ok', 200);
					emailManager.dispatchResetPasswordLink(o, function(e, m)
					{
					// this callback takes a moment to return //
					// should add an ajax loader to give user feedback //
						if (!e) 
						{
						//	res.send('ok', 200);
						}	
						else
						{
							res.send('email-server-error', 400);
							for (k in e) console.log('error : ', k, e[k]);
						}
					});
				}	
				else
				{
					res.send('email-not-found', 400);
				}
			});
	});

	app.get('/reset-password', function(req, res)
	{
			var email = req.query["e"];
			var passH = req.query["p"];
			accountManager.validateResetLink(email, passH, function(e)
			{
				if (e != 'ok')
				{
					res.redirect('/');
				} 
				else
				{
					// save the user's email in a session instead of sending to the client //
					req.session.reset = { email:email, passHash:passH };
					res.render('reset', { title : 'Reset Password' });
				}
			})
	});
		
	app.post('/reset-password', function(req, res)
	{
		var nPass = req.param('pass');
		// retrieve the user's email from the session to lookup their account and reset password //
		var email = req.session.reset.email;
		// destory the session immediately after retrieving the stored email //
		req.session.destroy();
		accountManager.updatePassword(email, nPass, function(e, o)
		{
			if (o)
			{
				res.send('ok', 200);
			}	
			else
			{
				res.send('unable to update password', 400);
			}
		})
	});
		
	// view & delete accounts //
	app.get('/print', function(req, res)
	{
		accountManager.getAllRecords( function(e, accounts)
		{
			res.render('print', { title : 'Account List', accts : accounts });
		})
	});
		
	app.post('/delete', function(req, res)
	{
			accountManager.deleteAccount(req.body.id, function(e, obj)
			{
				if (!e)
				{
					res.clearCookie('email');
					res.clearCookie('pass');
		            req.session.destroy(function(e){ res.send('ok', 200); });
				}	
				else
				{
					res.send('record not found', 400);
				}
		    });
	});
		
	app.get('/reset', function(req, res) 
	{
		accountManager.delAllRecords(function()
		{
			res.redirect('/print');	
		});
	});
		
	app.get('*', function(req, res){ res.render('404', { title: 'Page Not Found'}); });
}
