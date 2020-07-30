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
    form: {
        type: Schema.Types.ObjectId,
        ref: 'ExperimentForm'
    }

});

module.exports = mongoose.model('Experiment', experimentSchema);
