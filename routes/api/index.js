const router = require("express").Router();
const articleRoutes = require("./articles");


// Article routes
router.use("/articles", articleRoutes);
router.use("/nyt", articleRoutes);

module.exports = router;
