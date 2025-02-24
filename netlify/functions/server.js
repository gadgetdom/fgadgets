const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
    // Use the correct path to db.json
    const dbPath = path.join(__dirname, "db.json");

    try {
        // Read and parse the db.json file
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
