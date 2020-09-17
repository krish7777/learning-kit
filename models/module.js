const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const moduleSchema = new Schema({
    name: String,
    thumbnailPath: String,
    introduction: String,
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    type: String // ARDUINO, DIGITAL
    //excersices
});

exports.moduleSchema = moduleSchema

exports.Module = mongoose.model('Module', moduleSchema);
