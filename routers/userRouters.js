const router = require('express').Router();
const { Registration } = require('../controllers/userControllers');

router.post('/registration', Registration);

module.exports = router;