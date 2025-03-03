const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000; // Dynamic port

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running..."); // Root endpoint to check if server is up
});

app.get("/products", (req, res) => {
    try {
        const dbPath = path.join(__dirname, "db.json"); // Ensure correct path
        const data = fs.readFileSync(dbPath, "utf8");
        const jsonData = JSON.parse(data);
        res.json(jsonData.products);
    } catch (error) {
        console.error("Error reading db.json:", error);
        res.status(500).json({ error: "Failed to load products" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
