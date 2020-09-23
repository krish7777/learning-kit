const { Module } = require('../models/module');

exports.addModule = async (req, res, next) => {
    const { name, thumbnailPath, introduction , type } = req.body;
    // console.log("here")
    const module = new Module({
        name,
        thumbnailPath,
        introduction,
        type
    });
    try {
        let resp = await module.save();
        console.log("resp", resp)
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
    const {type} = req.params;
    try {
        let modules = await Module.find({type}).populate('courses')
        res.json({ modules })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}