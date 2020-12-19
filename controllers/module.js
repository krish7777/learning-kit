const { Module } = require('../models/module');
const { Track } = require('../models/track')
exports.addModule = async (req, res, next) => {
    const { name, thumbnailPath, introduction, type } = req.body;
    const module = new Module({
        name,
        thumbnailPath,
        introduction,
        type
    });
    try {
        let resp = await module.save();
        res.json({ "module_id": resp._id })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getModule = async (req, res, next) => {
    const { module_id } = req.params;
    try {
        let module = await Module.findById(module_id).populate('courses')
        res.json({ module })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getAllModules = async (req, res, next) => {
    const { type } = req.params;
    try {
        let modules = await Module.find({ type }).populate('courses')
        res.json({ modules })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getCourseTroubleshoot = async (req, res, next) => {
    const { type } = req.params;
    try {
        let troubleshoot = await Track.findOne({ name: type })
        console.log("viola",{troubleshoot})
        res.json({ troubleshoot })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.addCourseTroubleshoot = async (req, res, next) => {
    const { faqs } = req.body;
    const { type } = req.params;


    try {
        let troubleshoot = await Track.findOneAndUpdate({ name: type }, { $set: { faqs: faqs } }, { new: true })
        res.json({ troubleshoot })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }


}
