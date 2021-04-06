const router = require("express").Router();
const RenderHomePage = require("../controllers/index.controller");

/* GET home page. */
router.get("/", RenderHomePage);

module.exports = router;
