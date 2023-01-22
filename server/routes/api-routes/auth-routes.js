const router = express.Router();
const { login, callback, logout } = require("../../controllers/user-controller");

require("dotenv").config();

router.route('/login').get(login);
router.route('/callback').get(callback);
router.route('/logout').get(logout);

module.exports = router;