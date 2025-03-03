const express = require('express');  
const fs = require('fs');  
const path = require('path');  

const app = express();  
const port = process.env.PORT || 3000;  

app.get('/api/data', (req, res) => {  
    const filePath = path.join(__dirname, 'db.json');  
    fs.readFile(filePath, 'utf8', (err, data) => {  
        if (err) {  
            res.status(500).send('Error reading the database file.');  
            return;  
        }  
        res.header("Access-Control-Allow-Origin", "*");  
        res.json(JSON.parse(data));  
    });  
});  

app.listen(port, () => {  
    console.log(`Server running on http://localhost:${port}`);  
});  