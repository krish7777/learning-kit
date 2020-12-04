const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const router = express.Router();


const introStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const reqPath = path.join(__dirname, '..', 'images', 'introduction')
        if (!fs.existsSync(reqPath)) {
            fs.mkdirSync(reqPath, { recursive: true });
        }
        cb(null, reqPath)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname + '.png')
    }
})


const fileFilterIntroduction = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const experimentStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const reqPath = path.join(__dirname, '..', 'images', 'experiment')
        if (!fs.existsSync(reqPath)) {
            fs.mkdirSync(reqPath, { recursive: true });
        }
        cb(null, reqPath)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname + '.png')
    }
})

const fileFilterExperiment = (req, file, cb) => {
    if (
        file.mimetype === 'image/png'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const excerciseStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const reqPath = path.join(__dirname, '..', 'images', 'excercise')
        if (!fs.existsSync(reqPath)) {
            fs.mkdirSync(reqPath, { recursive: true });
        }
        cb(null, reqPath)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})


const fileFilterExcercise = (req, file, cb) => {
    if (
        file.mimetype === 'application/pdf'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const uploadIntro = multer({
    storage: introStorage,
    limits: {
        fileSize: 3000000
    },
    fileFilter: fileFilterIntroduction
})

const uploadExperiment = multer({
    storage: experimentStorage,
    limits: {
        fileSize: 4000000
    },
    fileFilter: fileFilterExperiment
})

const uploadExcercise = multer({
    storage: excerciseStorage,
    limits: {
        fileSize: 4000000
    },
    fileFilter: fileFilterExcercise
})



router.post('/introduction', uploadIntro.single('file'),
    (req, res) => {
        res.json({
            "location": `http://localhost:3300/images/introduction/${req.file.filename}`, "originalName": req.file.originalname
        })
    })

router.post('/experiment',
    uploadExperiment.single('file'),
    (req, res) => {
        console.log('req.file', req.file)
        res.status(200).json({ "location": `http://localhost:3300/images/experiment/${req.file.filename}`, "originalName": req.file.originalname })
    })

router.post('/excercise',
    uploadExcercise.single('file'),
    (req, res) => {
        res.status(200).json({ "location": `http://localhost:3300/images/excercise/${req.file.filename}`, "originalName": req.file.originalname })
    })

module.exports = router;