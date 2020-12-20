const express = require('express');

const isAuth = require('../middlewares/is-auth');
const {
    addModule,
    getModule,
    getAllModules,
    getCourseTroubleshoot,
    addCourseTroubleshoot,
    updateModule,
} = require('../controllers/module');
const router = express.Router();

router.post('/add', addModule);
router.get('/get/:module_id', getModule);
router.post('/update-name/:module_id', updateModule);
router.get('/all/:type', getAllModules);
router.get('/course-troubleshoot/:type', getCourseTroubleshoot);
router.post('/course-troubleshoot/:type', addCourseTroubleshoot);

module.exports = router;
