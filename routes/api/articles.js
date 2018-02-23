const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");
const nytController = require("../../controllers/nytController");

// Matches with "/api/articles"
// router.route("/")
//   .get(articlesController.findAll)
//   .save(articlesController.create);

router.route("/nyt")
  .get(nytController.findAll) 

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .delete(articlesController.remove);

module.exports = router;
