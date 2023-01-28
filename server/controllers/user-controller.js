const queryString = import("query-string");

const userController = {
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
            const { page } = req.params;
            res.oidc.login({
                returnTo: page,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async callback(req, res) {
        try {
            
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async logout(req, res) {
        try {
            const { page } = req.params;
            res.oidc.logout({
                returnTo: page,
            });
           
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = userController;