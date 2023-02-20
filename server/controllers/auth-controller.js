const authController = {
    async signup(req, res) {
        try {
            const { page } = req.params;
            res.oidc.login({
                returnTo: page,
                authorizationParams: {
                    screen_hint: 'signup'
                }
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async login(req, res) {
        try {
            await res.oidc.login({
                returnTo: '/api',
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async logout(req, res) {
        try {
            await res.oidc.logout();
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getUser(req, res) {
        try {
            const userData = await req.oidc.user;
            console.log(req.oidc.user.sub)
            res.send(JSON.stringify(userData));
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = authController;