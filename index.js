const express = require("express");
const app = express();
const db = require("./utils/db-connection")
const studentRoutes = require("./routes/studentRoutes")
const port = 3000;

//models
const studentModel = require("./models/students")

app.use(express.json());

app.get("/",(req,res) => {
    res.send("Hello World")
})

app.use("/student",studentRoutes)

db.sync({force:true}).then(() => {
    app.listen(port,() => {
    console.log("Server is Running..")
    })
})
.catch((err) => {
    console.log(err)
})

