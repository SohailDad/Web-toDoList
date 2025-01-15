const dbConnection = require('./utlis/db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/todos', (req, res) => {
    dbConnection.query('SELECT * FROM todos', (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    });
});

app.post('/todos', (req, res) => {
    const { text } = req.body; 

    if (!text) {
        return res.status(400).send('Text field is required');
    }

    const query = 'INSERT INTO todos (text) VALUES (?)';
    dbConnection.query(query, [text], (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err);
            return res.status(500).send('Error inserting todo');
        }
        res.json({ text }); 
    });
});


app.put('/todos/:id',(req,res)=>{
    const {id} = req.params;
    const {text} = req.body;

    const query = 'update todos set text=? where id = ?';
    dbConnection.query(query,[text ,id],(err)=>{
        if (err) {
            console.error("Error executing query: "+ err);
            return res.status(500).send('Error updating todo');
        }
        res.json({message:'Update successfully ...!'})
    })
})


app.delete('/todos/:id',(req,res)=>{
    const {id} = req.params;

    const query = 'delete from todos where id = ?';
    dbConnection.query(query,[id],(err)=>{
        if (err) {
            console.error('Error executing query:'+ err)
            return res.status(500).send('Error upadting todo');
        }
        res.json({message:"delete todo successfully ...!"})
    })
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})