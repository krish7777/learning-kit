const { Course } = require('../../models/course');
const { Module } = require('../../models/module');
const { StepThumb } = require('../../models/stepThumb');


exports.addCourse = async (req, res, next) => {
    const { name, thumbnailPath, thumbnailImage, module_id } = req.body;

    try {
        let stepThumb = new StepThumb({ ...thumbnailImage })
        let imgResp = await stepThumb.save();
        console.log(imgResp)
        const course = new Course({
            name,
            thumbnailPath,
            thumbnailImage: imgResp._id
        });
        console.log("course", course)
        let resp = await course.save();
        let module = await Module.updateOne({ _id: module_id }, { $push: { courses: resp._id } })
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
        // let course = await Course.findById(course_id).populate({
        //     path: 'buildCircuit', populate: {
        //         path: 'steps',

        //         model: 'Step',
        //         populate: [{
        //             path: 'upload_image',
        //             model: 'StepThumb'
        //         }, {
        //             path: 'upload_side',
        //             model: 'StepThumb'
        //         }]
        //     }
        // }).populate('introduction').populate('troubleshoot')
        let course = await Course.findById(course_id)
        res.json({ course })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}