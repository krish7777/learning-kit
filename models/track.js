const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
    name: {
        type: String,
    },
    faqs: [{
        question: String,
        answer: String
    }]
});
exports.trackSchema = trackSchema

exports.Track = mongoose.model('Track', trackSchema);
