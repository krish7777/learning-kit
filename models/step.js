const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const async = require('async');

const stepSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    imagePath: {
        type: String
    },
    simulationLink: {
        type: String
    },
    code: {//for arduino
        type: String
    },
    sideImagePath: {//for digital
        type: String,
    },
    upload_side: [{
        type: Schema.Types.ObjectId,
        ref: 'StepThumb'
    }],
    upload_image: [{
        type: Schema.Types.ObjectId,
        ref: 'StepThumb'
    }]
});

stepSchema.pre('deleteOne', function (next) {
    mongoose.model('Step').findOne(this._conditions, function (err, course) {
        if (err) { next(); }
        if (course) {
    async.parallel({
        one: function(parallelCb) {
            mongoose.model('StepThumb').deleteMany({_id:{$in:course.upload_side}}, function (err, res) {
                parallelCb(null, {err: err, res: res});
            })
        },
        two: function(parallelCb) {
            mongoose.model('StepThumb').deleteMany({_id:{$in:course.upload_image}}, function (err, res) {
                parallelCb(null, {err: err, res: res});
            })
        },
    }, function(err, results) {
        next();
    });
}
})
});

exports.stepSchema = stepSchema

exports.Step = mongoose.model('Step', stepSchema);
