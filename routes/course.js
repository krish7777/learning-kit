const express = require('express')

const { signup, login } = require('../controllers/auth');
const isAuth = require('../middlewares/is-auth');
const { addCourse, getCourse } = require('../controllers/course');
const { addIntroduction } = require('../controllers/course/introduction');
const { addBuildCircuit, getBuildCircuit } = require('../controllers/course/buildCircuit');
const router = express.Router();

router.post('/add', addCourse)
router.get('/get/:course_id', getCourse)
router.post('/buildCircuit', addBuildCircuit)
router.get('/buildCircuit/get/:id', getBuildCircuit)

router.post('/introduction', addIntroduction)

module.exports = router