const express = require('express')

const isAuth = require('../middlewares/is-auth');
const { addModule, getModule, getAllModules } = require('../controllers/module');
const router = express.Router();

router.post('/add', addModule)
router.get('/get/:module_id', getModule)
router.get('/all/:type', getAllModules)


module.exports = router