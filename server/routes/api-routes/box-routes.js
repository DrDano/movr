const router = require("express").Router();
const { getAllBoxes } = require("../../controllers/box-controller");

router.route("/").get(getAllBoxes);

module.exports = router;