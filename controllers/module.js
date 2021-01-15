const { Module } = require('../models/module');
const { Track } = require('../models/track');

exports.addModule = async (req, res, next) => {
    const { name, thumbnailPath, introduction, type } = req.body;
    const module = new Module({
        name,
        thumbnailPath,
        introduction,
        type,
    });
    try {
        let resp = await module.save();
        res.json({ module_id: resp._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getModule = async (req, res, next) => {
    const { module_id } = req.params;
    try {
        let module = await Module.findById(module_id).populate('courses');
        res.json({ module });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllModules = async (req, res, next) => {
    const { type } = req.params;
    try {
        let modules = await Module.find({ type }).populate('courses');
        modules.some(
            (item, idx) =>
                item.name === 'Getting Started' &&
                modules.unshift(modules.splice(idx, 1)[0])
        );
        res.json({ modules });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getCourseTroubleshoot = async (req, res, next) => {
    const { type } = req.params;
    try {
        let troubleshoot = await Track.findOne({ name: type });
        console.log({ troubleshoot });
        res.json({ troubleshoot });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.addCourseTroubleshoot = async (req, res, next) => {
    const { faqs } = req.body;
    const { type } = req.params;

    try {
        let troubleshoot = await Track.findOneAndUpdate(
            { name: type },
            { $set: { faqs: faqs } },
            { new: true }
        );
        res.json({ troubleshoot });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateModule = async (req, res, next) => {
    // const { name, thumbnailPath, introduction } = req.body;
    const name = req.body.name;
    const introduction = req.body.introduction;
    const { module_id } = req.params;
    // const module = new Module({
    //     name,
    //     thumbnailPath,
    //     introduction,
    // });
    try {
        let resp = await Module.update(
            { _id: module_id },
            { $set: { name: name, introduction: introduction } }
        );
        res.json({ module_id: resp._id, name: resp.name });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.addTrack = async (req, res, next) => {
    const { track } = req.body;
    const newTrack = new Track({
        name: track
    })
    try {
        let resp = await newTrack.save();
        res.json({ track_id: resp._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}