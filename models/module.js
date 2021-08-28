const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const async = require('async');

const moduleSchema = new Schema({
    name: String,
    thumbnailPath: String,
    introduction: String,
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    type: String // arduino, digital
    //troubleshoot
});

moduleSchema.pre('deleteOne', function (next) {
    mongoose.model('Module').findOne(this._conditions, function (err, course) {
        if (err) { next(); }
        if (course) {
            async.parallel({
                one: function (parallelCb) {
                    mongoose.model('Course').deleteMany({ _id: { $in: course.courses } }, function (err, res) {
                        parallelCb(null, { err: err, res: res });
                    })
                },
            }, function (err, results) {
                next();
            });
        }
        next();
    })
});

exports.moduleSchema = moduleSchema

exports.Module = mongoose.model('Module', moduleSchema);
