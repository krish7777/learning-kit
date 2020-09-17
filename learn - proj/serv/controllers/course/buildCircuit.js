const { Course } = require('../../models/course');
const { Introduction } = require('../../models/introduction');
const { Step } = require('../../models/step');
const { BuildCircuit } = require('../../models/buildCircuit');
const { StepThumb } = require('../../models/stepThumb');

exports.addBuildCircuit = async (req, res, next) => {
    const { course_id, steps } = req.body;
    try {
        let finalSteps = []

        this.addSteps(steps).then(async (finalSteps) => {
            console.log("finalSteps", finalSteps)
            let buildCircuit = new BuildCircuit({
                course_id,
                steps: finalSteps
            })
            let resp = await buildCircuit.save()
            let updatedCourse = await Course.updateOne({ _id: course_id }, { $set: { buildCircuit: resp._id } })
            console.log("updatedCourse", updatedCourse)
            console.log("resp", resp)
            res.json({ "buildCircuit": resp })
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}


exports.addSteps = async (steps) => {
    return Promise.all(steps.map(async step => {
        const { description, imagePath, sideImagePath, upload_image, upload_side } = step;
        let stepThumb = new StepThumb({ ...upload_image[0] })
        let imgResp = await stepThumb.save();
        console.log("upload_image[0]", upload_image[0])
        console.log("stepThumb", stepThumb)
        console.log("imgResp", imgResp)
        if (upload_side && upload_side.length) {
            let sideStepThumb = new StepThumb({ ...upload_side[0] })
            let sideImgResp = await sideStepThumb.save();
            let step1 = new Step({ description, imagePath, sideImagePath, upload_image: imgResp._id, upload_side: sideImgResp._id })
            let resp = await step1.save();
            console.log(resp._id)
            return resp._id
        } else {
            let step1 = new Step({ description, imagePath, upload_image: imgResp._id })
            let resp = await step1.save();
            console.log(resp._id)
            return resp._id
        }


    }))
}




exports.getBuildCircuit = async (req, res, next) => {
    const { id } = req.params;
    try {
        let buildCircuit = await BuildCircuit.findById(id).populate({
            path: 'steps',
            model: 'Step',
            populate: [{
                path: 'upload_image',
                model: 'StepThumb'
            }, {
                path: 'upload_side',
                model: 'StepThumb'
            }]
        })
        res.json({ buildCircuit })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}