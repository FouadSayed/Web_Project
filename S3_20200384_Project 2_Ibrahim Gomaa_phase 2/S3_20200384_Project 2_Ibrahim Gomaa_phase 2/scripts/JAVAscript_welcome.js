    var db=openDatabase("studentaffairs","1.0","studentaffairs",65535); 
        $(document).ready(function () {   
            db.transaction(function(transaction){
                        var sql="CREATE TABLE admin"+
                        "(nationalnum varchar(20) Not Null PRIMARY KEY,"+
                        "name varchar(100) not null unique,"+
                        "dateofbirth date not null,"+
                        "phone varchar(25) unique not null,"+
                        "username varchar(20) not null unique,"+
                        "password varchar(30) not null,"+
                        "email varchar(40) not null unique)";
                        transaction.executeSql(sql,undefined,
                            function(){
                                alert("admin table is created successfully");
                            },function(transaction,err){
                                
                            })
            });
            db.transaction(function(transaction){
                var sql="CREATE TABLE student"+
                        "(id Integer Not Null PRIMARY KEY,"+
                        "nationalnum varchar(20) not null unique,"+
                        "namee varchar(100) not null unique,"+
                        "dateofbirth date not null,"+
                        "phone varchar(25) unique not null,"+
                        "email varchar(40) not null unique,"+
                        "gpa numeric(3,2) not null,"+
                        "level Integer not null,"+
                        "department varchar(5) ,"+
                        "gender varchar(15) not null,"+
                        "status varchar(35) not null)";
                        transaction.executeSql(sql,undefined,
                            function(){
                                alert("student table is created successfully");
                            },function(transaction,err){
                                
                            })
            });
            $("#del_stu").click(function(){
                db.transaction(function(transaction){
                    var sql="Drop table student";
                    transaction.executeSql(sql,undefined,
                        function(){
                            alert("student table is deleted successfully");
                        },function(transaction,err){
                            
                        });
                });
            });
            $("#del_admin").click(function(){
                db.transaction(function(transaction){
                    var sql="Drop table admin";
                    transaction.executeSql(sql,undefined,
                        function(){
                            alert("admin table is deleted successfully");
                        },function(transaction,err){
                            alert(err.message);
                        });
                });
            });
        });