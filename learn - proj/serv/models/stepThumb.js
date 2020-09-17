const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stepThumbSchema = new Schema({
    name: String,
    status: String,
    thumbUrl: String,
    uid: String,
    response: {
        location: String,
        originalName: String
    }
});
exports.stepThumbSchema = stepThumbSchema

exports.StepThumb = mongoose.model('StepThumb', stepThumbSchema);
