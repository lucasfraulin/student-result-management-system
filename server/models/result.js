const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
    courseName: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Result', resultSchema);
