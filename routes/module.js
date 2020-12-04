const express = require('express')

const isAuth = require('../middlewares/is-auth');
const { addModule, getModule, getAllModules, getCourseTroubleshoot, addCourseTroubleshoot } = require('../controllers/module');
const router = express.Router();

router.post('/add', addModule)
router.get('/get/:module_id', getModule)
router.get('/all/:type', getAllModules)
router.get('/course-troubleshoot/:type', getCourseTroubleshoot)
router.post('/course-troubleshoot/:type', addCourseTroubleshoot)

module.exports = router