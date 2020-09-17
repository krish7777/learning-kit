const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { stepSchema } = require('./step');
const { experimentFormSchema } = require('./experimentForm');


const experimentSchema = new Schema({
    // courseId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Course',
    // },
    steps: [{ type: Schema.Types.ObjectId, ref: 'Step' }],
    simulationLink: String, // for digital
    form: {
        type: Schema.Types.ObjectId,
        ref: 'ExperimentForm'
    }

});
exports.experimentSchema = experimentSchema;

exports.Experiment = mongoose.model('Experiment', experimentSchema);
