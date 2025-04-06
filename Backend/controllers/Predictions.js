const config = require("../config/config")
const db = config.db
const bcrypt = require('bcrypt');

const addPrediction = async (req, res) => {
    const data = req.body;
    try {
        // Checking if all required fields exist
        if (!data.prediction_1 || !data.prediction_2 || !data.prediction_3) {
            return res.status(400).json({ status: "Invalid input. Missing required fields." });
        }

        // Inserting into users table
        const query1 = `INSERT INTO predictions (user_id, prediction_1,prediction_2,prediction_3) VALUES (?, ?,?,?)`;
        await db.promise().query(query1, [data.user_id, data.prediction_1,data.prediction_2,data.prediction_3]);
        res.json({ status: "Successfully added prediction" });
    } catch (error) {
        console.error("Error executing SQL query:", error);
        res.status(500).json({ error: "Database error" });
    }
};

const retrievePrediction = async (req, res) => {
    try {
        const user_id = req.query.user_id; // Get job title from query parameter

        // Retrieving from predictions table
        const query = `SELECT prediction_1 , prediction_2 , prediction_3 FROM predictions WHERE user_id = ?`;
        const [result] = await db.promise().query(query, [user_id]);
        res.json(result)

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    addPrediction,
    retrievePrediction
}