
(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
    
    $("#loginbutt").click(function () {
        var UserName=$("#inputuser").val();
        var Password=$("#inputpass").val();
        db.transaction(function(transaction){
            var sql = "SELECT nationalnum,password FROM admin" + " Where ( username like '%" + UserName + "%' )";
            transaction.executeSql(sql,undefined,
                function(transaction,result){
                    if (result.rows.length!=0){
                        var rightpass=result.rows.item(0).password;
                        var adminnational=result.rows.item(0).nationalnum;
                        localStorage.setItem('nat', adminnational );
                        if(rightpass==Password){
                            window.location.href = "home.html";
                            
                        } else{
                            alert("password is incorrect");
                        }

                }
                    else{
                        alert("username not found");
                    }
               
                },
                function(transaction,err){
                    alert(err.message);
                }
                )
        });
    });
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

})(jQuery);