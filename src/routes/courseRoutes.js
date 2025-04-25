const express = require("express");
const {
  fetchAllCoursesList,
  fetchAllCourseById,
} = require("../controller/courseController");
const router = express.Router();

router.get("/allCourseslist", fetchAllCoursesList);
router.post("/searchCoursebyId", fetchAllCourseById);

module.exports = router;
