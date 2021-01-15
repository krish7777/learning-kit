const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experimentSchema = new Schema({
    // courseId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Course',
    // },
    steps: [{ type: Schema.Types.ObjectId, ref: 'Step' }],
    simulationLink: String, // for Digital Experiments
    form: {
        type: Schema.Types.ObjectId,
        ref: 'ExperimentForm'
    },
    finalMessage: String

});
exports.experimentSchema = experimentSchema;

exports.Experiment = mongoose.model('Experiment', experimentSchema);
