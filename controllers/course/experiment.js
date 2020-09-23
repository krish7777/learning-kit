const { Course } = require('../../models/course');
const { Step } = require('../../models/step');
const { StepThumb } = require('../../models/stepThumb');
const { ExperimentForm } = require('../../models/experimentForm');
const { Experiment } = require('../../models/experiment');


exports.addExperiment = async (req, res, next) => {
    const { course_id, steps,simulationLink,exp_id} = req.body;
    if(!exp_id){
        try {
            this.addSteps(steps).then(async (finalSteps) => {
                console.log("finalSteps", finalSteps)
    
                let experiment = new Experiment({
                    course_id,
                    steps: finalSteps,
                    simulationLink: simulationLink
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
    }else{
        try {

            console.log("beore steps", steps)

            this.addSteps(steps).then(async (finalSteps) => {
                console.log("final");
                console.log(finalSteps)

                let updatedExperiment = await Experiment.updateOne({ _id: exp_id }, { $set: { steps: [...finalSteps], simulationLink: simulationLink} })
                console.log("updatedExpriment", updatedExperiment)
                res.json({ "experiment": "updated" })
            })
    
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        }
    }

}


exports.addExperimentForm = async (req, res, next) => {
    const { course_id, formContent,exp_id} = req.body;
    let {form} = await Experiment.findById(exp_id)
    if(form){
        try {
            let experimentForm = await ExperimentForm.updateOne({_id: form},{$set:{formContent:formContent} })
            res.json({"experimentForm":"updated"})
    
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        }
    }else{
        let experimentForm = new ExperimentForm({
            formContent
        })
        try{
            let form_id = await experimentForm.save();
            let updatedExp = await Experiment.updateOne({_id:exp_id},{$set: {form: form_id}})
            res.json({"experiment":"updated"})

        }catch(err){
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        }
    }
        
}





//IF STEPS HAVE IMAGES

exports.addSteps = async (steps) => {
    return Promise.all(steps.map(async step => {
        const { description, imagePath, upload_image } = step;
        console.log(imagePath)
        if(upload_image.length){
            console.log("gefefe")
            console.log(upload_image[0])
            let stepThumb = new StepThumb({ ...upload_image[0] })
            let imgResp = await stepThumb.save();
            let step1 = new Step({ description, imagePath, upload_image: imgResp._id })
            let resp = await step1.save();
            console.log("resp id",resp._id)
            return resp._id
        }
        else{
            let step1 = new Step({ description})
            let resp = await step1.save();
            console.log(resp._id)
            return resp._id
        }
        


    }))
}

// exports.addSteps = async (steps) => {
//     return Promise.all(steps.map(async step => {
//         const { description} = step;

//         let step1 = new Step({ description})
//         let resp = await step1.save();
//         console.log(resp._id)
//         return resp._id


//     }))
// }



exports.getExperiment = async (req, res, next) => {
    const { id } = req.params;
    try {
        let experiment = await Experiment.findById(id).populate({
            path: 'steps',
            model: 'Step',
            populate: [{
                path: 'upload_image',
                model: 'StepThumb'
            }]
        })
        console.log(experiment)
        res.json({ experiment })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getExperimentForm = async(req,res,next) => {
    const {id} = req.params;
    try{
        let {form} = await Experiment.findById(id).populate('form')
        res.json({form})
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}


