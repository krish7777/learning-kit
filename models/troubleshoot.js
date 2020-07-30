const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const troubleShootSchema = new Schema({
    html: {
        type: String,
        required: true
    },
    // courseId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Course'
    // }
});
exports.troubleShootSchema = troubleShootSchema

exports.TroubleShoot = mongoose.model('TroubleShoot', troubleShootSchema);
