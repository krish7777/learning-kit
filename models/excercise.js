const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const excerciseSchema = new Schema({
    excercise_list: [{
        question: String,
        hint: String
    }],
    excerciseFilePaths: [{
        type: String
    }],
    excerciseFiles: [{
        type: Schema.Types.ObjectId,
        ref: 'StepThumb'
    }]
});
exports.excerciseSchema = excerciseSchema

exports.Excercise = mongoose.model('Excercise', excerciseSchema);
