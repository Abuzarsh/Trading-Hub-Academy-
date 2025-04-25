const mysql = require("mysql2");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Create a connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "", // Add a fallback if necessary
  port: process.env.DB_PORT || 3306,
});

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "tradinghubacademy",
// });

// Function to connect to the database
const connectDB = async () => {
  try {
    await connection.connect();
    console.log("Connected to MySQL!");
  } catch (err) {
    console.error("Error connecting to MySQL:", err.message);
    process.exit(1); // Exit the process with an error code
  }
};

module.exports = { connectDB, connection };
