const { requiresAuth, claimEquals, claimIncludes, claimCheck } = require('express-openid-connect');
const router = require('express').Router();
const authRoutes = require('./auth-routes');
const apiRoutes = require('./api-routes');

// router.use('/', viewRoutes);
router.use('/auth', authRoutes);
router.use('/api', requiresAuth(), apiRoutes);

router.use((req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged In' : 'Logged Out');
});

module.exports = router;