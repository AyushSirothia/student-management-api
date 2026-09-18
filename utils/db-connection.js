const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("testDB","root","Ayush@2811",{
    host: "localhost",
    dialect: "mysql"
});

(async () => {try {
    await sequelize.authenticate();
    console.log("Database has been connected successfully using sequelize")
} catch(error) {
    console.log(error)
}})();


module.exports = sequelize;













// const mysql = require("mysql2");




// let connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Ayush@2811",
//     database: "testDB",
//     multipleStatements: true
// })

// connection.connect((err) => {
//     if(err) {
//         console.log(err);
//         return;
//     }
//     console.log("Database Connected")

//     const creationQuery = `create table IF NOT EXISTS Student (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(20),
//     email VARCHAR(30)
//     )`

//     connection.query(creationQuery,(err) => {
//         if(err){
//             console.log(err)
//             connection.end();
//             return;
//         }

//         console.log("DataBAse Created")
//     })
// })

// module.exports = connection;