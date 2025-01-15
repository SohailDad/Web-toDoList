const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'todolist'
})


connection.connect((error)=>{
    if(error){
        console.error("Database connection error ",error);
        return;
    }
    console.log("Database connect successfully ...!");

})

module.exports = connection;