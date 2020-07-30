const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experimentFormAnswerSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    studentId: {
        type: Schema.Types.ObjectId
    },
    questionFormId: {
        type: Schema.Types.ObjectId,
        ref: 'ExperimentForm'
    },
    answers: {
        type: {}
    }
}, {
    strict: false
});
exports.experimentFormAnswerSchema = experimentFormAnswerSchema

exports.ExperimentFormAnswer = mongoose.model('ExperimentFormAnswer', experimentFormAnswerSchema);
