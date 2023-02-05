$(document).ready(function($){
    "use strict";

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
    
    $(".rcov").click(function () {
        var temp = 0;
        var recoveremail = $("#emailforget").val();
        for (var i = 0; i < recoveremail.length; i++) {
            if (recoveremail[i] == "@") {
                temp = 1;
                var x = recoveremail.substr(i, recoveremail.length);
    
                if (x != "@gmail.com" && x != "@icloud.com" && x != "@yahoo.com" && x != "@hotmail.com"  && x != "@outlook.com") {
                    alert("error email should be end with @(gmail / icloud / yahoo / hotmail / outlook).com ");
                } else {
                    
                    db.transaction(function (transaction) {
                        var sql = "SELECT username,password FROM admin" + " Where ( email like '%" + recoveremail + "%' )";
                        transaction.executeSql(sql, undefined,
                            function (transaction, result) {
                                if (result.rows.length == 1) {
                                    var uusername = result.rows.item(0).username;
                                    var ppassword = result.rows.item(0).password;
                                    var subject="recover your email";
                                    var message = "your user name is: '" + uusername + "' and your password is: '" + ppassword + "'";
                                    window.open('mailto:'+recoveremail+'?subject='+subject+'&body='+message+'');
                                    

                                    window.location.href = "login.html";
                                    

                                } else {
                                    alert("email was not registered");

                                }

                            },
                            function (transaction, err) {
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


    });
  
})
 