const { Course } = require('../../models/course')

exports.addCourse = async (req, res, next) => {
    const { name, thumbnailPath } = req.body;
    const course = new Course({
        name,
        thumbnailPath
    });
    try {
        let resp = await course.save();
        console.log("resp", resp)
        res.json({ "course_id": resp._id })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getCourse = async (req, res, next) => {
    const { course_id } = req.params;
    try {
        let course = await Course.findById(course_id).populate({
            path: 'buildCircuit', populate: {
                path: 'steps',
                model: 'Step',
                populate: [{
                    path: 'upload_image',
                    model: 'StepThumb'
                }, {
                    path: 'upload_side',
                    model: 'StepThumb'
                }]
            }
        }).populate('introduction')
        res.json({ course })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}