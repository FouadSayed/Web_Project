

$(document).ready(function () {
    
    get_data();
    function get_data() {

        var mm = localStorage.getItem('nat');
        db.transaction(function (transaction) {
            var sql = "SELECT name,dateofbirth,phone,email,username,nationalnum,password FROM admin  Where ( nationalnum = " + mm + " )";
            transaction.executeSql(sql, undefined,
                function (transaction, result) {
                    $("#namea").val(result.rows.item(0).name);
                    $("#doba").val(result.rows.item(0).dateofbirth);
                    $("#nna").val(result.rows.item(0).nationalnum);
                    $("#phonea").val(result.rows.item(0).phone);
                    $("#emaila").val(result.rows.item(0).email);
                    $("#usernamea").val(result.rows.item(0).username);
                    $("#passwordd").val(result.rows.item(0).password);
                }, function (transaction, err) {
                    alert(err.message);
                });

        })

    };
    $("#goout").click(function(){
        var sure = confirm("Are you sure to Sign Out?");
        if (sure == true) {
            window.location.href = "login.html";

        }

    })
    $("#upda").click(function () {

        var sure = confirm("Are you sure to save all data?");
        if (sure == true) {

            db.transaction(function (transaction) {
                var temp = 0;
                var myname = $("#namea").val();
                var dobb = $("#doba").val();
                var nati = $("#nna").val();
                var pho = $("#phonea").val();
                var emmil = $("#emaila").val();
                var user = $("#usernamea").val();
                var pas = $("#passwordd").val();
                if (myname == "") {
                    alert("Name Should not be empty");
                } else if (dobb == "") {
                    alert("enter date of birth");
                }
                else if (pho == "" || pho.length > 14) {
                    alert("phone length should be less than 14");
                }
                else if (emmil == "") {
                    alert("email shouldn't be empty");
                }
                else if (user == "") {
                    alert("user name Should not be empty");
                }
                else if (pas.length < 8) {
                    alert("password length should be 8 or more");
                }
                else if (pas == "") {
                    alert("password Should not be empty");
                } else {
                    for (var i = 0; i < emmil.length; i++) {
                        if (emmil[i] == "@") {
                            temp = 1;
                            var x = emmil.substr(i, emmil.length);
                            if (x != "@gmail.com" && x != "@icloud.com" && x != "@yahoo.com" && x != "@hotmail.com" && x != "@outlook.com") {
                                alert("error email should be end with @(gmail / icloud / yahoo / hotmail / outlook ).com ");
                            } else {
                                db.transaction(function (transaction) {
                                    var sql = "Update admin " +
                                        "Set  " +
                                        "dateofbirth = '" + dobb + "' , name = '" + myname + "' ,  username = '" + user
                                        + "' , password = '" + pas +
                                        "' , phone = '" + pho + "' , email = '" + emmil + "' , nationalnum = '" + nati + "' " +
                                        "where ( nationalnum = " + nati + " )";
                                    transaction.executeSql(sql, undefined, function () {
                                        alert("admin is Modified successfully");

                                    }, function (transaction, err) {
                                        alert(err.message);
                                    })
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
        }
    });




})