const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoEmbedSchema = new Schema({
    title: String,
    url: {
        type: String,
    },
});

exports.videoEmbedSchema = videoEmbedSchema;

exports.VideoEmbed = mongoose.model('VideoEmbed', videoEmbedSchema);
