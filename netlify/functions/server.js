const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8000;

const dbPath = path.join(__dirname, "db.json");

// Middleware
app.use(express.json());

// Read db.json and serve it as an API
app.get("/products", (req, res) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading db.json:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        try {
            const jsonData = JSON.parse(data); // ✅ Ensure JSON is valid
            res.json(jsonData);
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
            res.status(500).json({ error: "Invalid JSON format in db.json" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
