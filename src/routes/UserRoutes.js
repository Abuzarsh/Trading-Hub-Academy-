const express = require("express");
const { fetchAllUserList } = require("../controller/UserController");
const router = express.Router();

router.get("/getAllUsersList", fetchAllUserList);

module.exports = router;
