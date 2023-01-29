const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const Student = require('./models/student');

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/srms", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(bodyParser.json());

app.post("/students/submit", (req, res) => {
  const { firstName, familyName, dateOfBirth } = req.body;
  const studentData = new Student({ firstName, familyName, dateOfBirth });
  studentData.save((err, studentData) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Data submitted successfully!" });
  });
});

app.get('/students/list', async (req, res) => {
    try {
        const students = await Student.find({}); // fetch all students from MongoDB
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const port = 8000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
