$("button[type=submit]").attr("disabled", "disabled");
$('.fields').bind('keyup', function(){

var emailField = $("#emailField")
var confirmEmailField = $("#confirmEmailField")
var passField = $("#passField")
var confirmPassField = $("#confirmPassField")

    if(emailField.length > 0 && confirmEmailField.length > 0){
        if(emailField.val() === confirmEmailField.val()){
            if(passField.length > 0 && confirmEmailField.length > 0){
                if(passField.val() === confirmPassField.val()){
                    $("button[type=submit]").removeAttr("disabled");
                }
            }
        }
    }
})