const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const troubleshootSchema = new Schema({
    faqs: [{
        question: String,
        answer: String
    }]
});
exports.troubleshootSchema = troubleshootSchema

exports.Troubleshoot = mongoose.model('Troubleshoot', troubleshootSchema);
