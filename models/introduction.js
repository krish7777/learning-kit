const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const introductionSchema = new Schema({
    html: {
        type: String,
        required: true
    },
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }
});
exports.introductionSchema = introductionSchema

exports.Introduction = mongoose.model('Introduction', introductionSchema);
