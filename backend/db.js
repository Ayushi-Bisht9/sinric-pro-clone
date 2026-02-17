const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",   // always use this (avoid ::1 issues)
  user: "root",        // default XAMPP user
  password: "",        // empty if you didn’t set one
  database: "sinricpro",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    return;
  }
  console.log("✅ Connected to MySQL (sinricpro)");
});

module.exports = db;
