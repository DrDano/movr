
const router = require('express').Router();
const { signup, login, logout } = require("../controllers/auth-controller");

require("dotenv").config();

router.route('/signup').get(signup);
router.route('/login').get(login);
router.route('/logout').get(logout);

module.exports = router;
