const { Course } = require('../../models/course');
const { Troubleshoot } = require('../../models/troubleshoot');
const { Track } = require('../../models/track');

exports.addTroubleshoot = async (req, res, next) => {
    const { course_id, faqs, troubleshoot_id } = req.body;

    if (!troubleshoot_id) {
        const troubleshoot = new Troubleshoot({
            faqs
        });
        try {
            let resp = await troubleshoot.save();
            let updatedCourse = await Course.updateOne({ _id: course_id }, { $set: { troubleshoot: resp._id } })
            console.log("updatedCourse", updatedCourse)
            res.json({ "troubleshoot": resp })
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        }
    } else {
        try {
            let updatedTroubleshoot = await Troubleshoot.updateOne({ _id: troubleshoot_id }, { $set: { faqs: faqs } })
            res.json({ "troubleshoot": "updated" })
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        }
    }

}

exports.getTroubleshoot = async (req, res, next) => {
    const { id } = req.params;
    console.log(req.query.type)
    try {
        if (req.query.type) {
            let topTroubleshoot = await Track.findOne({ name: req.query.type })
            if (topTroubleshoot) {
                let troubleshoot = await Troubleshoot.findById(id);
                troubleshoot = {
                    faqs: [...topTroubleshoot.faqs, ...troubleshoot.faqs]
                }
                res.json({ troubleshoot })
            }
        } else {
            let troubleshoot = await Troubleshoot.findById(id)
            res.json({ troubleshoot })
        }


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}