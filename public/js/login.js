$(document).ready(function(){
    $("button[type=submit]").attr("disabled", "disabled");

    $('.fields').bind('keyup',
        function(){
            var emailField = $("#emailField")
            var passField = $("#passField")

            if(emailField.length > 0 && passField.length > 0){
                $("button[type=submit]").removeAttr("disabled");
        }
    })
})