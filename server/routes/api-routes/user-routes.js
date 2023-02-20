const router = require("express").Router();
const { getUser } = require("../../controllers/auth-controller");

router.route("/").get(getUser);

module.exports = router;