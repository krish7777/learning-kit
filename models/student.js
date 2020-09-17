const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    formAnswers:[]
});

exports.studentSchema = studentSchema

exports.Student = mongoose.model('Student', studentSchema);
