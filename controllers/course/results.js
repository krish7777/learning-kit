const { Course } = require('../../models/course');
const { ExperimentForm } = require('../../models/experimentForm');




exports.addResults = async (req, res, next) => {
    const { course_id, formContent, results_id } = req.body;
    if (!results_id) {

        let results = new ExperimentForm({
            formContent
        })
        try {
            let form_id = await results.save();
            let updatedCourse = await Course.updateOne({ _id: course_id }, { $set: { results: form_id } })
            res.json({ "course": "updated" })

        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        }

    } else {
        try {
            let results = await ExperimentForm.updateOne({ _id: results_id }, { $set: { formContent: formContent } })
            res.json({ "results": "updated" })

        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        }
    }

}



exports.getResults = async (req, res, next) => {
    const { id } = req.params;
    try {
        let form = await ExperimentForm.findById(id)
        res.json({ form })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

