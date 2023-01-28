const router = require('express').Router();

const apiRoutes = require('./api-routes');

router.use('/', apiRoutes);

router.use((req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged In' : 'Logged Out');
});

module.exports = router;