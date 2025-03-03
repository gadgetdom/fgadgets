const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS (Allow frontend to fetch from backend)
app.use(cors());

// Read db.json and serve as API
app.get("/products", (req, res) => {
    try {
        const dbPath = path.join(__dirname, "db.json");
        const data = fs.readFileSync(dbPath, "utf8");
        const jsonData = JSON.parse(data);
        res.json(jsonData.products); // Ensure we return the "products" array
    } catch (error) {
        console.error("Error reading db.json:", error);
        res.status(500).json({ error: "Error reading db.json" });
    }
});

// Route for single product details
app.get("/products/:id", (req, res) => {
    try {
        const dbPath = path.join(__dirname, "db.json");
        const data = fs.readFileSync(dbPath, "utf8");
        const jsonData = JSON.parse(data);
        
        const product = jsonData.products.find(p => p.id == req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        
        res.json(product);
    } catch (error) {
        console.error("Error reading db.json:", error);
        res.status(500).json({ error: "Error reading db.json" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
