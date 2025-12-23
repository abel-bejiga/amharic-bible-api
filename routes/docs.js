const express = require("express");
const router = express.Router();
const apiDocs = require("../docs/apiDocs");

router.get("/", (req, res) => {
  res.render("docs", { apiDocs });
});

module.exports = router;
