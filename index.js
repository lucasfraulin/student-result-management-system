const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Student = require("./models/student");
const Course = require("./models/course");
const Result = require("./models/result");
const mongoose = require("mongoose");
const corsMiddleware = requrie("./middleware/corsMiddleware");

require('dotenv').config();

let mongoUrl = null;

if (process.env.MONGO_CONNECTION_URL) {
  mongoUrl = process.env.MONGO_CONNECTION_URL;
}

if (mongoUrl === null || mongoUrl === "") {
  mongoUrl = "mongodb://localhost:27017/srms";
}

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Serve frontend react build
const app = express();
app.use(express.static(path.join(__dirname, "./client/build")));

// Use bodyparser to parse json results from mongodb
app.use(bodyParser.json());

app.use(corsMiddleware); // use the created middleware

// Save student data to mongodb; table "students"
app.post("/students/submit", (req, res) => {
  const { firstName, familyName, dateOfBirth } = req.body;
  const studentData = new Student({ firstName, familyName, dateOfBirth });
  studentData.save((err, studentData) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Student Data submitted successfully!" });
  });
});

// Retrieve student data from mongodb; table "students"
app.get("/students/list", async (req, res) => {
  try {
    const students = await Student.find({}); // fetch all students from MongoDB
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Save course data to mongodb; table "courses"
app.post("/courses/submit", (req, res) => {
  const { courseName } = req.body;
  const courseData = new Course({ courseName });
  courseData.save((err, courseData) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Course Data submitted successfully!" });
  });
});

// Retrieve course data from mongodb; table "courses"
app.get("/courses/list", async (req, res) => {
  try {
    const courses = await Course.find({}); // fetch all courses from MongoDB
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Save result data to mongodb; table "results"
app.post("/results/submit", (req, res) => {
  const { courseName, studentName, grade } = req.body;
  const resultData = new Result({ courseName, studentName, grade });
  resultData.save((err, resultData) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Result Data submitted successfully!" });
  });
});

// Retrieve result data from mongodb; table "results"
app.get("/results/list", async (req, res) => {
  try {
    const results = await Result.find({}); // fetch all results from MongoDB
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Catch all for react frontend routes
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});