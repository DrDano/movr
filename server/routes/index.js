const router = require('express').Router();

router.use((req, res) => {
    res.status(404).send("<h1>Sorry, we can't find the page you're looking for.<h1>")
});

module.exports = router;