const express = require("express");
const router = express.Router();

const { auth } = require("../../middleware/auth");
const { USER_TYPE: { ADMIN } } = require("../../json/enums.json");
const { USER: { VALIDATOR, APIS }, } = require("../../controllers");

router.post("/signup", VALIDATOR.signup, APIS.signUp);
router.post("/login", VALIDATOR.signIn, APIS.signIn);
module.exports = router;
