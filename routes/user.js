const express = require("express")
const {userSignup, userLogin} = require("../controller/user")
const router = express.Router();

router.post("/", userSignup);
router.post("/login", userLogin);

module.exports = router;