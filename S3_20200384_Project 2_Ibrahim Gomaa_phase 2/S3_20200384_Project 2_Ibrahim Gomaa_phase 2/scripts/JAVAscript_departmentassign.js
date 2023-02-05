$(document).ready(function () {
    start();
    var levelll;
    var studentid;
    function start() {     
         studentid = localStorage.getItem("searchid");
         

        db.transaction(function (transaction) {
            var sql = "SELECT id,namee,department,level FROM student" + " Where ( id = " + studentid + " ) ";
            transaction.executeSql(sql, undefined,
                function (transaction, result) {
                    $("#id1").val(result.rows.item(0).namee);
                    $("#id2").val(result.rows.item(0).id);
                    levelll=result.rows.item(0).level;
                    $('select[name=deptt]').val(result.rows.item(0).department);
                    
                },
                function (transaction, err) {
                    alert(err.message);
                });
        });
        $("#subb").click(function () {
            var sure = confirm("Are you sure to assign this department to this student?");
            if (sure == true) {
                if(levelll>=3){
                    
                    db.transaction(function (transaction) {
                        var depttt = $("#deptt").val();
                    
                        var sql = "Update student "+
                        "Set  department = '"+depttt+"' "+ 
                        
                        "where ( id = " + studentid + " )";
                        transaction.executeSql(sql, undefined, function () {
                            alert("student is Modified successfully");
                        }, function (transaction, err) {
                            alert(err.message);
                        })
                    })
                } else{
                    alert("failed, student should be in third year or more to assign a department");
                }
                
            }
        });


    };
})