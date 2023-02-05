$(document).ready(function () {
    $("#save_all").click(function () {
        
        var temp=0;
        var ID = $("#id1").val();
        var NAME = $("#name1").val();
        var DOB = $("#dob1").val();
        var GPA = $("#gpa1").val();
        var GENDER = $(".gender:checked").val();
        var LEVEL = $(".level:checked").val();
        var STATUS = $(".status:checked").val();
        var DEPARTMENT = $(".department:checked").val();
        var EMAIL = $("#EMAIL1").val();
        var PHONE = $("#PHONE1").val();
        var NATIONALNUMBER = $("#nationaln").val();
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
        } else if (DEPARTMENT == null) {
            alert("enter student's department");
        }
        else if(EMAIL == "") {
            alert("email shouldn't be empty");
        }  else if (PHONE == "" || PHONE.length > 14) {
            alert("student's phone length should be less than 14");
        } else{
            if (LEVEL >= 3 || DEPARTMENT == 'None') {
                for (var i = 0; i < EMAIL.length; i++) {
                    if (EMAIL[i] == "@") {
                        temp=1;
                        var x = EMAIL.substr(i, EMAIL.length);
                        if (x != "@gmail.com" && x!="@icloud.com" && x!="@yahoo.com" && x!="@hotmail.com" && x!="@outlook.com") {
                            alert("error email should be end with @(gmail / icloud / yahoo / hotmail / outlook).com ");
                        }else{
                            db.transaction(function (transaction) {
                                var sql = "INSERT INTO student(id,namee,dateofbirth,phone,email,gpa,level,department,gender,status,nationalnum) Values(?,?,?,?,?,?,?,?,?,?,?)";
                                transaction.executeSql(sql, [ID, NAME, DOB, PHONE, EMAIL, GPA, LEVEL, DEPARTMENT, GENDER, STATUS, NATIONALNUMBER],
                                    function () {
                                        alert("New student is being added");
                                    }, function (transaction, err) {
                                        alert(err.message);
                                    }
                                );
                            });
                        }
                        break;
                    }
                }
                if(temp!=1){
                    alert("error email should be end with @(gmail / icloud / yahoo / hotmail / outlook).com ");
                }
                
            }
            else {
                alert("failed, student should be in third year or more to assign a department");
            }
        }
        

         

        


    });



})