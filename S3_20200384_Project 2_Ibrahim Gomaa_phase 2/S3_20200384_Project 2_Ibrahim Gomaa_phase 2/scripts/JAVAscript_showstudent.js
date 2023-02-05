$(document).ready(function(){
    showData();
    function showData(){
        $(".table").children().remove();
        db.transaction(function(transaction){
            var sql="SELECT id,namee,department,status,gpa,level FROM student ORDER BY id";
            transaction.executeSql(sql,undefined,
                function(transaction,result){
                    if(result.rows.length){
                        $(".table").append('<div class="row header" id="myheader"><div class="cell">Name</div><div class="cell">Id</div><div class="cell">Department</div><div class="cell">Level</div><div class="cell">GPA</div><div class="cell">Status</div></div>');
                        for(var i=0;i<result.rows.length;i++){
                            var row=result.rows.item(i);
                            var id=row.id;
                            var name=row.namee;
                            var department=row.department;
                            var gpa=row.gpa;
                            var level=row.level;
                            var status=row.status;
                            $(".table").append('<div class="row"><div class="cell">'+name+'</div><div class="cell">'+id+'</div><div class="cell">'+department+'</div><div class="cell">'+level+'</div><div class="cell">'+gpa+'</div><div class="cell" data-title="Status">'+status+'</div></div>');
                        }
                    }else{
                        $(".table").append('<div class="row header" id="myheader"><div class="cell">No Students Found</div></div>');
                    }
                },function(transaction,err){
                    alert(err.message);
                })
        })
    }
})