const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    thumbnailPath: String,
    introduction: {
        type: Schema.Types.ObjectId,
        ref: 'Introduction'
    },
    experiment: {
        type: Schema.Types.ObjectId,
        ref: 'Experiment'
    },
    buildCircuit: {
        type: Schema.Types.ObjectId,
        ref: 'BuildCircuit'
    },
    troubleshoot: {
        type: Schema.Types.ObjectId,
        ref: 'Troubleshoot'
    },
    excercise: {
        type: Schema.Types.ObjectId,
        ref: 'Excercise'
    }
});

exports.courseSchema = courseSchema

exports.Course = mongoose.model('Course', courseSchema);
