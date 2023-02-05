$(document).ready(function () {
    $("#buttsearch").click(function () {
        
        showwData();

    })
    function showwData() {
        var spec = $(".input-checkbox100:checked").val();
        var specname = $("#nameee").val();
        $(".table").children().remove();
        var idd;
        db.transaction(function (transaction) {
            if (spec == ('All')) {
                var sql = "SELECT id,namee,department,status,level,gpa FROM student" + " Where ( namee like '%" + specname + "%' or  id like '%" + specname + "%' ) ORDER BY id";
            } else {
                var sql = "SELECT id,namee,department,status,level,gpa FROM student" + " Where ( ( namee like '%" + specname + "%' or  id like '%" + specname + "%' ) and status = '" + spec + "' ) ORDER BY id";
            }
            transaction.executeSql(sql, undefined,
                function (transaction, result) {
                    if (result.rows.length) {
                        $(".table").append('<div class="row header" id="myheader"><div class="cell col-3">Name</div><div class="cell col-2">Id</div><div class="cell col-2">Department</div><div class="cell col-1">Level</div><div class="cell col-1">GPA</div><div class="cell col-1">Status</div></div>');
                        for (var i = 0; i < result.rows.length; i++) {
                            var row = result.rows.item(i);
                            var id = row.id;
                            var name = row.namee;
                            var department = row.department;
                            var status = row.status;
                            var level=row.level;
                            var gpa=row.gpa;
                            $(".table").append('<div class="row" id="del' + id + '" ><div class="cell  col-3">'+name+'</div><div class="cell  col-2">'+id+'</div><div class="cell col-2">'+department+'</div><div class="cell col-1">'+level+'</div><div class="cell col-1">'+gpa+'</div><div class="cell col-1" data-title="Status">'+status+'</div><div class="login100-form-btn col-2 m-t-3 asssign " data-id="' + id + '" id="assignstart">Assign Department</div></div>');}
                    } else {
                        $(".table").append('<div class="row header" id="myheader"><div class="cell">No Students Found</div></div>');
                    }
                }, function (transaction, err) {
                    alert(err.message);
                });

        })
        setTimeout(function () {
            $(".asssign").click(function () {
                var sure = confirm("Are you sure you want to assign department to this student?");
                if (sure == true) {
                    var id = $(this).data("id");
                    localStorage.setItem("searchid", id);
                    window.location.href = "departmentassign.html";


                }
            });
        }, 1000);




    };

})
