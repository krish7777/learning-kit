const mongoose = require('mongoose');
const { stepThumbSchema } = require('./stepThumb');
const Schema = mongoose.Schema;

const stepSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        //required: true --> since experiment dont need it
    },
    code:{//for arduino
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
exports.stepSchema = stepSchema

exports.Step = mongoose.model('Step', stepSchema);
