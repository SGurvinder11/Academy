const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Suchet@1128",   // <-- your password
  database: "cu_lms"
});

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server Working");
});


// ================= AUTH =================

// REGISTER
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const sql = "INSERT INTO teachers (username, password) VALUES (?, ?)";

  db.query(sql, [username, password], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error registering");
    }
    res.send("Registered");
  });
});


// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM teachers WHERE username=? AND password=?";

  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.log("Login Error:", err);
      return res.status(500).send({ success: false });
    }

    if (result.length > 0) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  });
});


// ================= STUDENTS =================

// GET STUDENTS
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// ADD STUDENT
app.post("/add-student", (req, res) => {
  const { name, course_code, attendance, marks, semester, branch } = req.body;

  const sql = `
    INSERT INTO students (name, course_code, attendance, marks, semester, branch)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, course_code, attendance, marks, semester, branch], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Added");
  });
});

// DELETE
app.delete("/delete-student/:id", (req, res) => {
  db.query("DELETE FROM students WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Deleted");
  });
});

// UPDATE
app.put("/update-student/:id", (req, res) => {
  const { name, course_code, attendance, marks, semester, branch } = req.body;

  const sql = `
    UPDATE students 
    SET name=?, course_code=?, attendance=?, marks=?, semester=?, branch=?
    WHERE id=?
  `;

  db.query(sql, [name, course_code, attendance, marks, semester, branch, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Updated");
  });
});


// SERVER START
app.listen(5000, () => {
  console.log("Server running on port 5000");
});