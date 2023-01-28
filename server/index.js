const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/srms", { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(bodyParser.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const formSchema = new mongoose.Schema({
  firstName: String,
  familyName: String,
  dateOfBirth: Date
});

const Form = mongoose.model("Form", formSchema);

app.post("/students/submit", (req, res) => {
  const { firstName, familyName, dateOfBirth } = req.body;
  const formData = new Form({ firstName, familyName, dateOfBirth });
  formData.save((err, formData) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Data submitted successfully!" });
  });
});

const port = 8000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
