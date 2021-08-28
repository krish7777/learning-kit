const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const async = require('async');

const excerciseSchema = new Schema({
    excercise_list: [{
        question: String,
        hint: String,
        isUpload: Boolean,
        isCode: Boolean
    }],
    excerciseFilePaths: [{
        type: String
    }],
    excerciseFiles: [{
        type: Schema.Types.ObjectId,
        ref: 'StepThumb'
    }]
});

excerciseSchema.pre('deleteOne', function (next) {
    mongoose.model('Excercise').findOne(this._conditions, function (err, course) {
        if (err) { next(); }
        if (course) {
            async.parallel({
                one: function (parallelCb) {
                    mongoose.model('StepThumb').deleteMany({ _id: { $in: course.excerciseFiles } }, function (err, res) {
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

exports.excerciseSchema = excerciseSchema

exports.Excercise = mongoose.model('Excercise', excerciseSchema);
