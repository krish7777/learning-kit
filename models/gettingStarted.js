const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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

exports.gettingStartedSchema = gettingStartedSchema

exports.gettingStarted = mongoose.model('Starting', gettingStartedSchema);
