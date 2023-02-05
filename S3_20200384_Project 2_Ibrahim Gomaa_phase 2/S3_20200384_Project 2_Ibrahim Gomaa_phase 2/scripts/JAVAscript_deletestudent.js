$(document).ready(function () {
    $("#startdelsearch").click(function () {
        loadData();
    });
    function loadData() {
        var searchh = $("#id_search").val();
        

        $(".table").children().remove();
        
        db.transaction(function (transaction) {
            var sql = "SELECT id,namee,department,status,level,gpa FROM student" + " Where ( id like '%" + searchh + "%' or namee like '%" + searchh + "%'  ) ORDER BY id";
            transaction.executeSql(sql, undefined,
                function (transaction, result) {
                    if (result.rows.length) {
                        $(".table").append('<div class="row header" id="myheader"><div class="cell col-3">Name</div><div class="cell col-2">Id</div><div class="cell col-2">Department</div><div class="cell col-1">Level</div><div class="cell col-1">GPA</div><div class="cell col-1">Status</div></div>');
                        for (var i = 0; i < result.rows.length; i++) {
                            var row = result.rows.item(i);
                            var id = row.id;
                            var gpa=row.gpa;
                            var name = row.namee;
                            var department = row.department;
                            var status = row.status;
                            var level=row.level;
                            $(".table").append('<div class="row" id="del' + id + '" ><div class="cell  col-3">'+name+'</div><div class="cell  col-2">'+id+'</div><div class="cell col-2">'+department+'</div><div class="cell col-1">'+level+'</div><div class="cell col-1">'+gpa+'</div><div class="cell col-1" data-title="Status">'+status+'</div><div class=" goout col-2 m-t-3 deleteee " data-id="' + id + '">Delete Student</div></div>');
                        }
                    } else {
                        $(".table").append('<div class="row header" id="myheader"><div class="cell">No Students Found</div></div>');
                    }
                }, function (transaction, err) {
                    alert(err.message);
                });

        })
        setTimeout(function () {
            $(".deleteee").click(function () {
                var sure = confirm("Are you sure to delete this student?");
                if (sure === true) {
                    var id = $(this).data("id");
                    db.transaction(function (transaction) {
                        var sql = "DELETE FROM student where (id=?)";
                        transaction.executeSql(sql, [id], function () {
                        
                            alert("student is deleted successfully");
                        }, function (transaction, err) {
                            alert(err.message);
                        })
                    })
                }
            });
        },1000);
    };
    

})