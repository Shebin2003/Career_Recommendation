require("dotenv").config(); // Load environment variables
const mysql = require("mysql2")

// Database connection setup
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err)=>{
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Database connected');
})

module.exports = {
    PORT:process.env.PORT || 3000, 
    db,
    model:process.env.MODEL
}