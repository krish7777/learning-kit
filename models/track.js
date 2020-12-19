const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
    name: {
        type: String,
    },
    faqs: [{
        question: String,
        answer: String
    }],
    gettingStarted: [{
        name: String,
        thumbnailPath: String,
        introduction: String,
        starters: [{
            type: Schema.Types.ObjectId,
            ref: 'Starting'
        }],
        type: String 
    }]
});
exports.trackSchema = trackSchema

exports.Track = mongoose.model('Track', trackSchema);
