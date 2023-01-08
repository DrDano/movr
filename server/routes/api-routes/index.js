const router = require('express').Router();
const boxRoutes = require('./box-routes');

router.use('/box', boxRoutes);

module.exports = router;
