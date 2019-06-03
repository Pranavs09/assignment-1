const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

db.serialize(function(){

db.run("CREATE TABLE CLASSROOM (Building, Room_number, Capacity)");
db.run("INSERT INTO CLASSROOM VALUES ('Packard', 101, 500)");
db.run("INSERT INTO CLASSROOM VALUES ('Painter', 514, 10)");
db.run("INSERT INTO CLASSROOM VALUES ('Taylor', 3128, 70)");
db.run("INSERT INTO CLASSROOM VALUES ('Watson', 100, 30)");
db.run("INSERT INTO CLASSROOM VALUES ('Watson', 120, 50)");


db.run("CREATE TABLE DEPARTMENT(Dept_name, Building, Budget)");
db.run("INSERT INTO DEPARTMENT VALUES ('Biology', 'Watson', 90000)");
db.run("INSERT INTO DEPARTMENT VALUES ('Comp. Sci.', 'Taylor', 100000)");
db.run("INSERT INTO DEPARTMENT VALUES ('Elec. Eng.', 'Taylor', 85000)");
db.run("INSERT INTO DEPARTMENT VALUES ('Finance', 'Painter', 120000)");
db.run("INSERT INTO DEPARTMENT VALUES ('History', 'Painter', 50000)");
db.run("INSERT INTO DEPARTMENT VALUES ('Music', 'Packard', 80000)");
db.run("INSERT INTO DEPARTMENT VALUES ('Physics', 'Watson', 70000)");

/*db.each("SELECT * FROM CLASSROOM",function(err,row){
    console.log(row);
});

db.each("SELECT * FROM DEPARTMENT",function(err,row){
    console.log(row);
});*/

db.each("SELECT Room_number, Building from CLASSROOM where Capacity > 50 ",function(err,row){
    if(err)
        console.log(err);
    console.log(row);
});

db.each("SELECT Dept_name from DEPARTMENT where Budget >  85000 ",function(err,row){
    if(err)
        console.log(err);
    console.log(row);
});

/*db.each("SELECT * from CLASSROOM NATURAL JOIN DEPARTMENT",function(err,row){
    console.log(row);
});

db.each("SELECT Dept_name, Building, Capacity from CLASSROOM NATURAL JOIN DEPARTMENT", function(err,row){
    console.log(row);
});
db.each("SELECT DISTINCT Dept_name,Capacity FROM CLASSROOM NATURAL JOIN DEPARTMENT",function(err,row){
    console.log(row);
});*/

db.each("SELECT DEPARTMENT.Dept_name, SUM(Capacity) AS Total_Capacity FROM CLASSROOM NATURAL JOIN DEPARTMENT GROUP BY DEPARTMENT.Dept_name",function(err,row){
    if(err)
        console.log(err);
    console.log(row);
});

});