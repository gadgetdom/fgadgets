const fs = require("fs");
const path = require("path");

exports.handler = async () => {
    try {
        // Correct file path to db.json inside Netlify functions
        const dbPath = path.resolve(__dirname, "db.json");

        // Read the file asynchronously
        const data = fs.readFileSync(dbPath, "utf8");
        const jsonData = JSON.parse(data);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData),
        };
    } catch (error) {
        console.error("Error reading db.json:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error reading db.json" }),
        };
    }
};
