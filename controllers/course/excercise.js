const { Course } = require('../../models/course');
const { Troubleshoot } = require('../../models/troubleshoot');
const { Excercise } = require('../../models/excercise');
const { StepThumb } = require('../../models/stepThumb');

exports.addExcercise = async (req, res, next) => {
    const { course_id, excerciseFiles, excercise_list, excerciseFilePaths, excercise_id } = req.body;
    if (!excercise_id) {
        // const excercise = new Excercise({
        //     excercise_list,
        //     excerciseFiles
        // });
        try {
            this.addExcerciseFiles(excerciseFiles).then(async (finalFiles) => {
                let excercise = new Excercise({
                    excercise_list,
                    excerciseFilePaths,
                    excerciseFiles: finalFiles
                });
                let resp = await excercise.save();
                let updatedCourse = await Course.updateOne({ _id: course_id }, { $set: { excercise: resp._id } })
                res.json({ "excercise": resp })
            })
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        }
    } else {
        try {
            this.addExcerciseFiles(excerciseFiles).then(async (finalFiles) => {
                let updatedExcercise = await Excercise.updateOne({ _id: excercise_id }, { $set: { excercise_list: excercise_list, excerciseFiles: finalFiles, excerciseFilePaths } })
                res.json({ "excercise": "updated" })
            })
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        }
    }

}

exports.addExcerciseFiles = async (files) => {
    return Promise.all(files.map(async file => {
        let stepThumb = new StepThumb(file)
        let fileResp = await stepThumb.save();
        return fileResp._id
    }))
}


exports.getExcercise = async (req, res, next) => {
    console.log("called for excercise")
    const { id } = req.params;
    try {
        let excercise = await Excercise.findById(id).populate('excerciseFiles')
        console.log("what are we getting", excercise)
        res.json({ excercise })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}