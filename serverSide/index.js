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
    const { text } = req.body; // Destructure 'text' from the request body

    if (!text) {
        return res.status(400).send('Text field is required');
    }

    const query = 'INSERT INTO todos (text) VALUES (?)';
    dbConnection.query(query, [text], (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err);
            return res.status(500).send('Error inserting todo');
        }
        res.json({ text }); // Return the new todo ID
    });
});


app.put('/todos/')



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})