
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
    
    $("#signup").click(function () {
        var temp = 0;
        var Name = $("#adminname").val();
        var Dob = $("#dob").val();
        var NATIONALNUMBER = $("#nn").val();
        var Phone = $("#adminphone").val();
        var Email = $("#adminemail").val();
        var UserName = $("#adminuser").val();
        var Password = $("#adminpassword").val();
        if (Name == "") {
            alert("Name Should not be empty");
        }else if (Dob == "") {
            alert("enter date of birth");
        }
        
        else if (NATIONALNUMBER.length != 14) {
            alert("national number length should be 14");
        }
        else if (Phone == "" || Phone.length > 14) {
            alert("phone length should be less than 14");
        }
        else if (Email == "") {
            alert("email shouldn't be empty");
        }
        else if (UserName == "") {
            alert("user name Should not be empty");
        }
        else if (Password.length < 8) {
            alert("password length should be 8 or more");
        }
       else if (Password == "") {
            alert("password Should not be empty");
        }  else {
            for (var i = 0; i < Email.length; i++) {
                if (Email[i] == "@") {
                    temp = 1;
                    var x = Email.substr(i, Email.length);
                    if (x != "@gmail.com" && x != "@icloud.com" && x != "@yahoo.com" && x != "@hotmail.com" &&  x != "@outlook.com") {
                        alert("error email should be end with @(gmail / icloud / yahoo / hotmail / outlook).com ");
                    } else {
                        db.transaction(function (transaction) {
                            var sql = "Insert into admin (name,nationalnum,dateofbirth,phone,username,email,password) Values(?,?,?,?,?,?,?)";
                            transaction.executeSql(sql, [Name, NATIONALNUMBER, Dob, Phone, UserName, Email, Password],
                                function () {
                                    window.location.href = "login.html";
                                }, function (transaction, err) {
                                    alert(err.message);

                                }
                            );
                        });
                    }
                    break;
                }
            }
            if (temp != 1) {
                alert("error email should be end with @(gmail / icloud / yahoo / hotmail / outlook).com ");
            }
        }


    })
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


