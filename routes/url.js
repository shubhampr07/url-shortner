const express = require("express");
const {generateNewShortUrl, getAnalytics} = require("../controller/url")
const router = express.Router();

router.post("/", generateNewShortUrl);
router.get("/analytics/:shortId", getAnalytics);


module.exports = router;