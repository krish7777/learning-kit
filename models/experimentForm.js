const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experimentFormSchema = new Schema({
    // courseId: {
    //     type: Schema.Types.ObjectId,
    //     ref: ' Course',
    // },
    formContent: [{
        type: String,
        name: String,
        label: String,
        values: [String],
        required: Boolean
    }]
}, {
    strict: false
});
exports.experimentFormSchema = experimentFormSchema

exports.ExperimentForm = mongoose.model('ExperimentForm', experimentFormSchema);
