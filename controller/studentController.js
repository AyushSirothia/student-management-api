const connection = require("../utils/db-connection");
const db = require("../utils/db-connection")

const addEntries = (req,res) => {
    const {email, name} = req.body;
    const insertQuery = `insert into Student (email, name) values (?,?)`

    db.execute(insertQuery,[email,name],(err) => {
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            connection.end();
            return;
        }

        console.log("Values has been inserted")
        res.status(200).send(`Student with name ${name} info has been added succesfully`)
    })
}

const updateEntry = (req,res) => {
    const {id} = req.params;
    const {name} = req.body;
    const updateQuery = `update Student set name =  ? where id = ?`
    

    db.execute(updateQuery, [name,id],(err,result) => {
        if(err) {
            console.log(err.message)
            res.status(500).send(err.message);
            db.end();
            return;
        }

        if(result.affectedRows === 0){
            res.status(404).send("Student not found")
        }

        res.send(`Updated Student info with ${id} successfully`)
    })
}

const deleteEntry = (req,res) => {
    const {id} = req.params;
    const deleteQuery = `delete from Student where id = ?`;

    db.execute(deleteQuery,[id],(err,result) => {
        if(err) {
            console.log(err.message)
            res.status(500).send(err.message)
            db.end()
            return
        }

        if(result.affectedRows === 0){
            res.status(404).send("Student not found")
        }

        res.send(`Deleted student with id ${id}`)
    })
}

module.exports = {
    addEntries,
    updateEntry,
    deleteEntry
}