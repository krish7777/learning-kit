const { Course } = require('../../models/course');
const { Introduction } = require('../../models/introduction');
const { Step } = require('../../models/step');
const { BuildCircuit } = require('../../models/buildCircuit');
const { StepThumb } = require('../../models/stepThumb');

exports.addBuildCircuit = async (req, res, next) => {
    const { course_id, steps, code, codeStepStart, build_id } = req.body;
    console.log("the body", req.body)

    if (!build_id) {
        try {
            this.addSteps(steps).then(async (finalSteps) => {
                let buildCircuit = new BuildCircuit({
                    course_id,
                    code,
                    codeStepStart,
                    steps: finalSteps
                })
                let resp = await buildCircuit.save()
                let updatedCourse = await Course.updateOne({ _id: course_id }, { $set: { buildCircuit: resp._id } })
                res.json({ "buildCircuit": resp })
            })

        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        }
    } else {

        try {
            this.addSteps(steps).then(async (finalSteps) => {
                let updatedBuildCircuit = await BuildCircuit.updateOne({ _id: build_id }, { $set: { steps: finalSteps, code: code, codeStepStart: codeStepStart } })
                res.json({ "buildCircuit": "updated" })
            })

        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        }
    }
}


exports.addSteps = async (steps) => {
    return Promise.all(steps.map(async step => {
        const { description, imagePath, sideImagePath, upload_image, upload_side } = step;
        let stepThumb = new StepThumb({ ...upload_image[0] })
        let imgResp = await stepThumb.save();

        if (upload_side && upload_side.length) {
            let sideStepThumb = new StepThumb({ ...upload_side[0] })
            let sideImgResp = await sideStepThumb.save();
            let step1 = new Step({ description, imagePath, sideImagePath, upload_image: imgResp._id, upload_side: sideImgResp._id })
            let resp = await step1.save();
            return resp._id
        } else {
            let step1 = new Step({ description, imagePath, upload_image: imgResp._id })
            let resp = await step1.save();
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