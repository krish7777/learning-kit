const express = require('express');

const isAuth = require('../middlewares/is-auth');
const isAdmin = require('../middlewares/is-admin');
const {
    addModule,
    getModule,
    getAllModules,
    getCourseTroubleshoot,
    addCourseTroubleshoot,
    updateModule,
    addTrack
} = require('../controllers/module');
const router = express.Router();

router.post('/add', addModule);//isAdmin
router.get('/get/:module_id', getModule);
router.post('/update-info/:module_id', updateModule);//isAdmin
router.get('/all/:type', getAllModules);
router.get('/course-troubleshoot/:type', getCourseTroubleshoot);
router.post('/course-troubleshoot/:type', addCourseTroubleshoot);//isAdmin
router.post('/add-track', isAdmin, addTrack)//isAdmin [ONLY FOR IONTERNAL USES]


module.exports = router;
