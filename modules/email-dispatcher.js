
var emailSettings = require('./email-settings');
var emailManager = {};
module.exports = emailManager;

emailManager.server = require("emailjs/email").server.connect({

	host 	    : emailSettings.host,
	user 	    : emailSettings.user,
	password    : emailSettings.password,
	ssl		    : true

});

emailManager.dispatchResetPasswordLink = function(account, callback)
{
	emailSettings.server.send({
		from         : emailSettings.sender,
		to           : account.email,
		subject      : 'Password Reset',
		text         : 'something went wrong... :(',
		attachment   : emailManager.composeEmail(account)
	}, callback );
}

emailManager.composeEmail = function(o)
{
	var link = 'http://node-login.braitsch.io/reset-password?e='+o.email+'&p='+o.pass;
	var html = "<html><body>";
		html += "Hi,<br><br>";
		html += "<a href='"+link+"'>Please click here to reset your password</a><br><br>";
		html += "thank you!,<br>";
		html += "</body></html>";
	return  [{data:html, alternative:true}];
}