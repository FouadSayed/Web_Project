/*var queries = queryString.split("&"); 
        for (var i = 0; i < queries.length; i++) 
        { 
         document.write(queries[i] + "<br>"); 
        } */
$(document).ready(function () {
    var studentid;
    start();
    function start() {
        
        studentid = localStorage.getItem("idupdate");
        db.transaction(function (transaction) {
            var sql = "SELECT id,namee,department,status,dateofbirth,phone,email,gpa,level,gender,nationalnum FROM student" + " Where ( id = " + studentid + " ) ";
            transaction.executeSql(sql, undefined,
                function (transaction, result) {
                    $("#id1").val(result.rows.item(0).id);
                    $("#name1").val(result.rows.item(0).namee);
                    $("#dob1").val(result.rows.item(0).dateofbirth);
                    $("#gpa1").val(result.rows.item(0).gpa);
                    
                    $('input:radio[name="gender"][value=' + result.rows.item(0).gender + ']').prop('checked', true);
                    $('input:radio[name="level"][value=' + result.rows.item(0).level + ']').prop('checked', true);
                    $('input:radio[name="status"][value=' + result.rows.item(0).status + ']').prop('checked', true);

                    $("#DEPT").val(result.rows.item(0).department);
                    $("#EMAIL1").val(result.rows.item(0).email);
                    $("#PHONE1").val(result.rows.item(0).phone);
                    $("#nationaln").val(result.rows.item(0).nationalnum)
                },
                function (transaction, err) {
                    alert(err.message);
                });
        });

    }
    $("#savebutt").click(function () {
        var sure = confirm("Are you sure to save all data?");
        if (sure == true) {
            db.transaction(function (transaction) {
                var temp=0;
                var ID = $("#id1").val();
                localStorage.setItem("idupdate",ID);
                var NAME = $("#name1").val();
                var DOB = $("#dob1").val();
                var GPA = $("#gpa1").val();
                var GENDER = $(".gender:checked").val();
                var LEVEL = $(".level:checked").val();
                var STATUS = $(".status:checked").val();
                var NATIONALNUMBER=$("#nationaln").val();
                var EMAIL = $("#EMAIL1").val();
                var PHONE = $("#PHONE1").val();
                if (ID.length != 8) {
                    alert("Id length should be 8");
                }
                else if (NAME == "") {
                    alert("Name Should not be empty");
                }
                else if (DOB == "") {
                    alert("enter student's date of birth");
                }
                else if (NATIONALNUMBER.length != 14) {
                    alert("national number length should be 14");
                } else if (GPA == "") {
                    alert("enter student's gpa");
                }
                else if (GPA > 4 || GPA < 0) {
                    alert("GPA should be in range [0.00,4.00]");
                }  else if (GENDER == null) {
                    alert("enter student's gender");
                } else if (LEVEL == null) {
                    alert("enter student's level")
                }  else if (STATUS == null) {
                    alert("enter student's status");
                }
                else if(EMAIL == "") {
                    alert("email shouldn't be empty");
                }  else if (PHONE == "" || PHONE.length > 14) {
                    alert("student's phone length should be less than 14");
                } else{
                    for (var i = 0; i < EMAIL.length; i++) {
                        if (EMAIL[i] == "@") {
                            temp=1;
                            var x = EMAIL.substr(i, EMAIL.length);
                            if (x != "@gmail.com" && x!="@icloud.com" && x!="@yahoo.com" && x!="@hotmail.com" && x!="@outlook.com") {
                                alert("error email should be end with @(gmail / icloud / yahoo / hotmail / outlook).com ");
                            }else{
                                db.transaction(function (transaction) {
                                    var sql = "Update student "+
                                    "Set  id = "+ID+" ,"+" gpa = "+GPA+"  , "+
                                    "dateofbirth = '"+DOB+"' , namee = '"+NAME+"' , gender = '"+GENDER+
                                    "' , level = "+LEVEL+" , status = '"+STATUS+
                                    "' , phone = '"+PHONE+"' , email = '"+EMAIL+"'  , nationalnum = '"+NATIONALNUMBER+"' "+
                                    "where ( id = " + studentid + " )";
                                    transaction.executeSql(sql, undefined, function () {
                                        queryString=ID;
                                        alert("student is Modified successfully");
                                        
                                    }, function (transaction, err) {
                                        alert(err.message);
                                    })
                                });
                            }
                            break;
                        }
                    }
                    if(temp!=1){
                        alert("error email should be end with @(gmail / icloud / yahoo / hotmail / outlook).com ");
                    }
                }
                
            })
        }
    });
    $("#deletebutt").click(function () {

        var sure = confirm("Are you sure to delete this student?");
        if (sure == true) {

            db.transaction(function (transaction) {
                var sql = "DELETE FROM student where ( id = " + studentid + " )";
                transaction.executeSql(sql, undefined, function () {
                    alert("student is deleted successfully");
                    window.location.href = "update.html";

                }, function (transaction, err) {
                    alert(err.message);
                })
            })
        }
    });
});

