const router = require('express').Router();
const userRoutes = require('./user-routes');
const boxRoutes = require('./box-routes');
const authRoutes = require('../auth-routes');

router.use('/user', userRoutes);
router.use('/box', boxRoutes);
router.use('/', authRoutes);

module.exports = router;
