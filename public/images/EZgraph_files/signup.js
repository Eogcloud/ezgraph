
$(document).ready(function(){
	
	var accountValidator= new AccountValidator();
	var sc = new SignupController();
	
	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return accountValidator.validateForm();
		},
		success	: function(responseText, status, xhr, $form)
		{
			if (status == 'success') 
				$('.modal-alert').modal('show');
		},
		error : function(e)
		{
			if (e.responseText == 'email-taken')
			{
			    accountValidator.showInvalidEmail();
			}	
			else if (e.responseText == 'username-taken')
			{
			    accountValidator.showInvalidUserName();
			}
		}
	});

	
// customize the account signup form //
	
	$('#account-form h1').text('EZgraph Signup');
	$('#account-form #sub1').text('Please Enter your Account Email & password');
	$('#account-form-btn1').html('Cancel');
	$('#account-form-btn1').addClass('btn-danger');
	$('#account-form-btn2').html('Submit');
	$('#account-form-btn2').addClass('btn-success');

	
// setup the alert that displays when an account is successfully created //

	$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
	$('.modal-alert .modal-header h3').text('Success!');
	$('.modal-alert .modal-body p').html('Your account has been created.</br>Click OK to return to the login page.');

})