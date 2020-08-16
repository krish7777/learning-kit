const { Course } = require('../../models/course');
const { Troubleshoot } = require('../../models/troubleshoot');

exports.addTroubleshoot = async (req, res, next) => {
    const { course_id, faqs } = req.body;
    const troubleshoot = new Troubleshoot({
        faqs
    });
    try {
        let resp = await troubleshoot.save();
        console.log("resp", resp)
        let updatedCourse = await Course.updateOne({ _id: course_id }, { $set: { troubleshoot: resp._id } })
        console.log("updatedCourse", updatedCourse)
        res.json({ "troubleshoot": resp })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getTroubleshoot = async (req, res, next) => {
    const { id } = req.params;
    try {
        let troubleshoot = await Troubleshoot.findById(id)
        res.json({ troubleshoot })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}