
$(document).ready(function () {
    $("#startsearch").click(function () {
        showData();
    });
    function showData() {
        var searchhh =$("#id_input").val();
        
        $(".tablee").children().remove();
        db.transaction(function (transaction) {
            var sql = "SELECT id,namee,department,status,level,gpa FROM student" + " Where ( id like '%" + searchhh + "%' or namee like '%" + searchhh + "%' ) ORDER BY id";
            transaction.executeSql(sql, undefined,
                function (transaction, result) {
                    if (result.rows.length) {
                        $(".tablee").append('<div class="row header" id="myheader"><div class="cell col-3">Name</div><div class="cell col-2">Id</div><div class="cell col-2">Department</div><div class="cell col-1">Level</div><div class="cell col-1">GPA</div><div class="cell col-1">Status</div></div>');
                        for (var i = 0; i < result.rows.length; i++) {
                            var row = result.rows.item(i);
                            var id = row.id;
                            var gpa=row.gpa;
                            var name = row.namee;
                            var department = row.department;
                            var status = row.status;
                            var level = row.level;
                            $(".tablee").append('<div class="row" id="del' + id + '" ><div class="cell  col-3">'+name+'</div><div class="cell  col-2">'+id+'</div><div class="cell col-2">'+department+'</div><div class="cell col-1">'+level+'</div><div class="cell col-1">'+gpa+'</div><div class="cell col-1" data-title="Status">'+status+'</div><div class="login100-form-btn col-2 m-t-3 editstud " data-id="' + id + '"">Edit Student</div></div>');}
                        
                    } else {
                        $(".tablee").append('<div class="row header" id="myheader"><div class="cell">No Students Found</div></div>');
                    }
                }, function (transaction, err) {
                    alert(err.message);
                });

        })
        setTimeout(function () {
            $(".editstud").click(function () {
                
                var sure = confirm("Are you sure you want to edit this student's data?");
                if (sure == true) {
                    var id = $(this).data("id");
                    localStorage.setItem("idupdate",id)
                    window.location.href = "update2.html";
                    
                    

                }
            });
        },1000);
    };

})