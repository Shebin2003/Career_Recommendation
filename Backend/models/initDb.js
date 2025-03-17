const config = require("../config/config")
const db = config.db

const createTables = async (err) => {
    console.log("hello world")
    if (err) throw err;
    try {
        const users_query = "CREATE TABLE IF NOT EXISTS users(user_id INT PRIMARY KEY AUTO_INCREMENT, user_name VARCHAR(50),email_id VARCHAR(50));";
        await db.promise().query(users_query);
        console.log("users table created successfully");

        const userCredentials_query = "create table if not exists user_credentials(user_id int primary key,password varchar(250), foreign key (user_id) references users(user_id) on delete cascade);"
        await db.promise().query(userCredentials_query);

        const predictions_query = "create table if not exists predictions(prediction_id int primary key AUTO_INCREMENT,user_id int,prediction_1 varchar(250),prediction_2 varchar(250),prediction_3 varchar(250), foreign key (user_id) references users(user_id) on delete cascade);"
        await db.promise().query(predictions_query);

    } catch (error) {
        console.error("Error executing SQL query:", error);
    }
};

module.exports = createTables;
