const express = require("express");
const router = express.Router();
const { searchBible } = require("../controllers/search.controller");

router.get("/search", searchBible);

module.exports = router;
