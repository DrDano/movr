const router = require('express').Router();
const boxRoutes = require('./box-routes');
const authRoutes = require('./auth-routes');

router.use('/box', boxRoutes);
router.use('/auth', authRoutes);

module.exports = router;
