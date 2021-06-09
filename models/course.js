const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    thumbnailPath: String,
    thumbnailImage: {
        type: Schema.Types.ObjectId,
        ref: 'StepThumb'
    },
    introduction: {
        type: Schema.Types.ObjectId,
        ref: 'Introduction'
    },
    experiment: {
        type: Schema.Types.ObjectId,
        ref: 'Experiment'
    },
    simulation: {
        type: Schema.Types.ObjectId,
        ref: 'Experiment'
    },
    videoembed: {
        type: Schema.Types.ObjectId,
        ref: 'VideoEmbed'
    },
    buildCircuit: {
        type: Schema.Types.ObjectId,
        ref: 'BuildCircuit'
    },
    troubleshoot: {
        type: Schema.Types.ObjectId,
        ref: 'Troubleshoot'
    },
    results: {
        type: Schema.Types.ObjectId,
        ref: 'ExperimentForm'
    },
    excercise: {
        type: Schema.Types.ObjectId,
        ref: 'Excercise'
    }
});

exports.courseSchema = courseSchema

exports.Course = mongoose.model('Course', courseSchema);
