const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ===== TEMP USERS (FOR LOGIN) =====
let users = [
  { username: "admin", password: "admin123" }
];

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server Working");
});

// REGISTER
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  users.push({ username, password });

  res.send({ message: "Registered" });
});

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

// ===== DUMMY STUDENTS DATA =====
const students = [
  { id: 1, name: "Aman", course_code: "CSE", attendance: 85, marks: 78 },
  { id: 2, name: "Riya", course_code: "IT", attendance: 60, marks: 88 },
  { id: 3, name: "Rahul", course_code: "ECE", attendance: 72, marks: 67 },
];

// GET STUDENTS
app.get("/students", (req, res) => {
  res.send(students);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});