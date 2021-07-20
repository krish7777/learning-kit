const { Course } = require('../../models/course');
const { Module } = require('../../models/module');
const { StepThumb } = require('../../models/stepThumb');


exports.addCourse = async (req, res, next) => {
    const { name, thumbnailPath, thumbnailImage, module_id } = req.body;

    try {
        let stepThumb = new StepThumb({ ...thumbnailImage })
        let imgResp = await stepThumb.save();
        const course = new Course({
            name,
            thumbnailPath,
            thumbnailImage: imgResp._id
        });
        console.log("course", course)
        let resp = await course.save();
        let module = await Module.updateOne({ _id: module_id }, { $push: { courses: resp._id } })
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

exports.getParentModule = async(req,res,next)=>{
    const { course_id } = req.params;
    try {
        let module = await Module.findOne({courses:course_id})
        res.json({name:module.name})

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.updateSubModule = async (req, res, next) => {
    // const { name, thumbnailPath, introduction } = req.body;
    const name = req.body.name;
    const { course_id } = req.params;
    try {
        let resp = await Course.update(
            { _id: course_id },
            { $set: { name: name } }
        );
        res.json({ course_id: resp._id, name: resp.name });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteSubModule = async (req, res, next) => {
    // const { name, thumbnailPath, introduction } = req.body;
    const { course_id } = req.params;
    try {
        let resp = await Course.deleteOne(
            { _id: course_id }
        );
        res.json(resp);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteField = async (req, res, next) => {
    const { course_id,field } = req.params;
    try {
        let resp = await Course.findOne(
            { _id: course_id },
            function(err, user){
                user[field] = undefined;
                user.save();
            });
            // this one unlike delete only flushes, will need to propagate to delete children
        res.json(resp);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};