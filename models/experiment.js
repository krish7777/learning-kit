const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const async = require('async');

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

experimentSchema.pre('deleteOne', function (next) {
    mongoose.model('Experiment').findOne(this._conditions, function (err, course) {
        if (err) { next(); }
        if (course) {
    async.parallel({
        one: function(parallelCb) {
            mongoose.model('Step').deleteMany({_id:{$in:course.steps}}, function (err, res) {
                parallelCb(null, {err: err, res: res});
            })
        },
        two: function(parallelCb) {
            mongoose.model('ExperimentForm').deleteOne({_id:course.form}, function (err, res) {
                parallelCb(null, {err: err, res: res});

            })
        },
    }, function(err, results) {
        next();
    });
}
})
});

exports.experimentSchema = experimentSchema;

exports.Experiment = mongoose.model('Experiment', experimentSchema);
