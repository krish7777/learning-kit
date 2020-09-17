const { Course } = require('../../models/course');
const { Troubleshoot } = require('../../models/troubleshoot');
const { Excercise } = require('../../models/excercise');

exports.addExcercise = async (req, res, next) => {
    const { course_id, excercise_list , excercise_id } = req.body;
    if(!excercise_id){
        const excercise = new Excercise({
            excercise_list
        });
        try {
            let resp = await excercise.save();
            console.log("resp", resp)
            let updatedCourse = await Course.updateOne({ _id: course_id }, { $set: { excercise: resp._id } })
            console.log("updatedCourse", updatedCourse)
            res.json({ "excercise": resp })
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        }
    }else{
        try {
            let updatedExcercise = await Excercise.updateOne({ _id: excercise_id }, { $set: { excercise_list: excercise_list } })
            console.log("updatedExcercise", updatedExcercise)
            res.json({ "excercise": "updated" })
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        }
    }

}

exports.getExcercise = async (req, res, next) => {
    const { id } = req.params;
    try {
        let excercise = await Excercise.findById(id)
        res.json({ excercise })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}