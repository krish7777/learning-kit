const { Course } = require('../../models/course');
const { Step } = require('../../models/step');
const { StepThumb } = require('../../models/stepThumb');
const { ExperimentForm } = require('../../models/experimentForm');
const { Experiment } = require('../../models/experiment');


exports.addExperiment = async (req, res, next) => {
    const { course_id, steps, formContent } = req.body;
    try {
        let experimentForm = new ExperimentForm({ formContent })
        let formResp = await experimentForm.save();
        this.addSteps(steps).then(async (finalSteps) => {
            console.log("finalSteps", finalSteps)

            let experiment = new Experiment({
                course_id,
                steps: finalSteps,
                form: formResp._id
            })
            let resp = await experiment.save()
            let updatedCourse = await Course.updateOne({ _id: course_id }, { $set: { experiment: resp._id } })
            console.log("updatedCourse", updatedCourse)
            console.log("resp", resp)
            res.json({ "experiment": resp })
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
        const { description, imagePath, upload_image } = step;
        let stepThumb = new StepThumb({ ...upload_image[0] })
        let imgResp = await stepThumb.save();
        console.log("upload_image[0]", upload_image[0])
        console.log("stepThumb", stepThumb)
        console.log("imgResp", imgResp)

        let step1 = new Step({ description, imagePath, upload_image: imgResp._id })
        let resp = await step1.save();
        console.log(resp._id)
        return resp._id


    }))
}


exports.getExperiment = async (req, res, next) => {
    const { id } = req.params;
    try {
        let experiment = await Experiment.findById(id).populate('steps').populate('form')
        res.json({ experiment })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}