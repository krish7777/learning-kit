const { VideoEmbed } = require('../../models/videoembed');
const { Course } = require('../../models/course');

exports.getVideoEmbed = async (req, res, next) => {
    const { id } = req.params;
    try {
        let videoembed = await VideoEmbed.findById(id)
        // .populate({
        //     title: 'title',
        //     url: 'videourl',
        // });

        // console.log('videoembed: ', videoembed);
        res.status(200).json({ videoembed });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.addVideoEmbed = async (req, res, next) => {
    const { course_id, title, url } = req.body;
    const newVideoEmbed = new VideoEmbed({
        course_id,
        title,
        url,
    });
    let resp = await newVideoEmbed.save();
    let updatedEmbed = await Course.updateOne(
        { _id: course_id },
        { $set: { videoembed: resp._id } }
    );
    res.status(201).json({ videoembed: resp });
    try {
    } catch (error) {
        if (!err.statusCode) {
            err.statusCode = 509;
        }
        next(err);
    }
};
