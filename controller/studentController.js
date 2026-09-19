const connection = require("../utils/db-connection");
const db = require("../utils/db-connection")
const Student = require("../models/students")

const addEntries = async (req,res) => {
    // const {email, name} = req.body;
    // const insertQuery = `insert into Student (email, name) values (?,?)`

    // db.execute(insertQuery,[email,name],(err) => {
    //     if(err){
    //         console.log(err.message)
    //         res.status(500).send(err.message)
    //         connection.end();
    //         return;
    //     }

    //     console.log("Values has been inserted")
    //     res.status(200).send(`Student with name ${name} info has been added succesfully`)
    // })

    try{
        const {email,name} = req.body;
        const student = await Student.create({
            email:email,
            name:name
        });

        res.status(201).send(`User with name ${name} is created`)
    } catch(err){
        res.status(500).send("Unable to make an entry")
    }
}

const updateEntry = async (req,res) => {
    try{
        const {id} = req.params;
        const {name} = req.body;

        const student = await Student.findByPk(id);
        if(!student){
            res.status(404).send("User is not found")
        }
        student.name = name;
        await student.save();
        res.status(200).send("User is Updated")
    } catch(err){
        res.status(500).send("User cannot be updated");
    }
    // const updateQuery = `update Student set name =  ? where id = ?`
    

    // db.execute(updateQuery, [name,id],(err,result) => {
    //     if(err) {
    //         console.log(err.message)
    //         res.status(500).send(err.message);
    //         db.end();
    //         return;
    //     }

    //     if(result.affectedRows === 0){
    //         res.status(404).send("Student not found")
    //     }

    //     res.send(`Updated Student info with ${id} successfully`)
    // })
}

const deleteEntry = async (req,res) => {
    try {
        const {id} =  req.params;
        const student = await Student.destroy({
            where: {
                id:id
            }
        })

        if(!student){
            res.status(404).send("user is not found")
        }

        res.status(200).send("User deleted successfullt")
    } catch(err) {
        console.log(err)
        res.status(500).send("user not deleted")
    }
    // const deleteQuery = `delete from Student where id = ?`;

    // db.execute(deleteQuery,[id],(err,result) => {
    //     if(err) {
    //         console.log(err.message)
    //         res.status(500).send(err.message)
    //         db.end()
    //         return
    //     }

    //     if(result.affectedRows === 0){
    //         res.status(404).send("Student not found")
    //     }

    //     res.send(`Deleted student with id ${id}`)
    // })
}

module.exports = {
    addEntries,
    updateEntry,
    deleteEntry
}