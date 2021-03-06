const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buildCircuitSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },
    steps: [{
        type: Schema.Types.ObjectId,
        ref: 'Step'
    }],
    code: String,
    codeStepStart: Number,//Same as finalCircuitStep for digital, NAMING SHOULD BE MODIFIED
});
exports.buildCircuitSchema = buildCircuitSchema
exports.BuildCircuit = mongoose.model('BuildCircuit', buildCircuitSchema);
