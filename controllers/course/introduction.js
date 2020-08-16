const { Course } = require('../../models/course');
const { Introduction } = require('../../models/introduction');

exports.addIntroduction = async (req, res, next) => {
    const { course_id, html } = req.body;
    const introduction = new Introduction({
        html,
        course_id
    });
    try {
        let resp = await introduction.save();
        console.log("resp", resp)
        let updatedCourse = await Course.updateOne({ _id: course_id }, { $set: { introduction: resp._id } })
        console.log("updatedCourse", updatedCourse)
        res.json({ "introduction": resp })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getIntroduction = async (req, res, next) => {
    const { id } = req.params;
    try {
        let introduction = await Introduction.findById(id);
        res.json({ introduction })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}