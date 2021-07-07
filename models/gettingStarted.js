const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const async = require('async');

const gettingStartedSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    thumbnailPath: String,
    thumbnailImage: {
        type: Schema.Types.ObjectId,
        ref: 'StepThumb'
    },
    // introduction: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Introduction'
    // },
    experiment: {
        type: Schema.Types.ObjectId,
        ref: 'Experiment'
    }
});

gettingStartedSchema.pre('deleteOne', function (next) {
    mongoose.model('Starting').findOne(this._conditions, function (err, course) {
        if (err) { next(); }
        if (course) {
    async.parallel({
        one: function(parallelCb) {
            mongoose.model('StepThumb').deleteOne({_id:course.thumbnailImage}, function (err, res) {
                parallelCb(null, {err: err, res: res});

            })
        },
        two: function(parallelCb) {
            mongoose.model('Experiment').deleteOne({_id:course.experiment}, function (err, res) {
                parallelCb(null, {err: err, res: res});

            })
        },
    }, function(err, results) {
        next();
    });
}
})
});

exports.gettingStartedSchema = gettingStartedSchema

exports.gettingStarted = mongoose.model('Starting', gettingStartedSchema);
