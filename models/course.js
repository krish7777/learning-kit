const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const async = require('async');


const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    thumbnailPath: String,
    thumbnailImage: {
        type: Schema.Types.ObjectId,
        ref: 'StepThumb'
    },
    introduction: {
        type: Schema.Types.ObjectId,
        ref: 'Introduction'
    },
    experiment: {
        type: Schema.Types.ObjectId,
        ref: 'Experiment'
    },
    simulation: {
        type: Schema.Types.ObjectId,
        ref: 'Experiment'
    },
    videoembed: {
        type: Schema.Types.ObjectId,
        ref: 'VideoEmbed'
    },
    buildCircuit: {
        type: Schema.Types.ObjectId,
        ref: 'BuildCircuit'
    },
    troubleshoot: {
        type: Schema.Types.ObjectId,
        ref: 'Troubleshoot'
    },
    results: {
        type: Schema.Types.ObjectId,
        ref: 'ExperimentForm'
    },
    excercise: {
        type: Schema.Types.ObjectId,
        ref: 'Excercise'
    }
});

courseSchema.pre(['deleteOne', 'deleteMany'], function (next) {
    mongoose.model('Course').findOne(this._conditions, function (err, course) {
        if (err) { next(); }
        if (course) {
            async.parallel({
                one: function (parallelCb) {
                    mongoose.model('StepThumb').deleteOne({ _id: course.thumbnailImage }, function (err, res) {
                        parallelCb(null, { err: err, res: res });

                    })
                },
                two: function (parallelCb) {
                    mongoose.model('Introduction').deleteOne({ _id: course.introduction }, function (err, res) {
                        parallelCb(null, { err: err, res: res });

                    })
                },
                three: function (parallelCb) {
                    mongoose.model('Experiment').deleteOne({ _id: course.experiment }, function (err, res) {
                        parallelCb(null, { err: err, res: res });

                    })
                },
                four: function (parallelCb) {
                    mongoose.model('Experiment').deleteOne({ _id: course.simulation }, function (err, res) {
                        parallelCb(null, { err: err, res: res });

                    })
                },
                five: function (parallelCb) {
                    mongoose.model('VideoEmbed').deleteOne({ _id: course.videoembed }, function (err, res) {
                        parallelCb(null, { err: err, res: res });
                    })
                },
                six: function (parallelCb) {
                    mongoose.model('BuildCircuit').deleteOne({ _id: course.buildCircuit }, function (err, res) {
                        parallelCb(null, { err: err, res: res });

                    })
                },
                seven: function (parallelCb) {
                    mongoose.model('Troubleshoot').deleteOne({ _id: course.troubleshoot }, function (err, res) {
                        parallelCb(null, { err: err, res: res });

                    })
                },
                eight: function (parallelCb) {
                    mongoose.model('ExperimentForm').deleteOne({ _id: course.results }, function (err, res) {
                        parallelCb(null, { err: err, res: res });

                    })
                },
                nine: function (parallelCb) {
                    mongoose.model('Excercise').deleteOne({ _id: course.excercise }, function (err, res) {
                        parallelCb(null, { err: err, res: res });

                    })
                },
            }, function (err, results) {
                next();
            });
        }
    })
});

exports.courseSchema = courseSchema

exports.Course = mongoose.model('Course', courseSchema);