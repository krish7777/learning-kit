const express = require('express')

const isAuth = require('../middlewares/is-auth');
const isAdmin = require('../middlewares/is-admin');
const { addCourse, getCourse, getParentModule, updateSubModule } = require('../controllers/course');
const { addIntroduction, getIntroduction } = require('../controllers/course/introduction');
const { addBuildCircuit, getBuildCircuit } = require('../controllers/course/buildCircuit');
const { addTroubleshoot, getTroubleshoot } = require('../controllers/course/troubleshoot');
const { addExperiment, getExperiment, getExperimentForm, addExperimentForm, getSimulation, addSimulation } = require('../controllers/course/experiment');
const { getVideoEmbed, addVideoEmbed } = require ('../controllers/course/videoembed.js');
const { addExcercise, getExcercise } = require('../controllers/course/excercise');
const { getResults, addResults } = require('../controllers/course/results');
const router = express.Router();

router.post('/add', addCourse) //isAdmin
router.get('/get/:course_id', getCourse)
router.get('/getp/:course_id', getParentModule)
router.post('/buildCircuit', addBuildCircuit)//isAdmin
router.get('/buildCircuit/get/:id', getBuildCircuit)
router.get('/experiment/get/:id', getExperiment)
router.get('/simulation/get/:id', getSimulation)
router.get('/videoembed/get/:id', getVideoEmbed)
router.post('/troubleshoot', addTroubleshoot)//isAdmin
router.get('/troubleshoot/get/:id', getTroubleshoot)
router.post('/update/:course_id', updateSubModule)//isAdmin
router.post('/excercise', addExcercise)//isAdmin
router.get('/excercise/get/:id', getExcercise)
router.post('/experiment', addExperiment)//isAdmin
router.post('/simulation', addSimulation)//isAdmin
router.post('/videoembed', addVideoEmbed)//isAdmin
router.get('/experimentForm/get/:id', getExperimentForm)
router.post('/experimentForm', addExperimentForm)//isAdmin
router.get('/results/get/:id', getResults)
router.post('/results', addResults)//isAdmin
router.post('/introduction', addIntroduction)//isAdmin
router.get('/introduction/get/:id', getIntroduction)
module.exports = router