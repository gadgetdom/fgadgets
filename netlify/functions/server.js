const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
    const dbPath = path.join(__dirname, "/db.json");

    try {
        const data = fs.readFileSync(dbPath, "utf8");
        const jsonData = JSON.parse(data);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error reading db.json" }),
        };
    }
};
