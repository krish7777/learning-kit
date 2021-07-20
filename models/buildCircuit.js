const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const async = require('async');

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

buildCircuitSchema.pre('deleteOne', function (next) {
    mongoose.model('BuildCircuit').findOne(this._conditions, function (err, course) {
        if (err) { next(); }
        if (course) {
            async.parallel({
                one: function(parallelCb) {
                    mongoose.model('Step').deleteMany({_id:{$in:course.steps}}, function (err, res) {
                        parallelCb(null, {err: err, res: res});
                    })
                },
            }, function(err, results) {
                next();
            });
        }
})
});

exports.buildCircuitSchema = buildCircuitSchema
exports.BuildCircuit = mongoose.model('BuildCircuit', buildCircuitSchema);
