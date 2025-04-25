const CourseModel = require("../models/courseModel");

const fetchAllCoursesList = async (req, res) => {
  try {
    const Courses = await CourseModel.fetchAllCoursesList();
    res.status(200).json(Courses);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const fetchAllCourseById = async (req, res) => {
  try {
    const CourseDetails = await CourseModel.fetchCourseById(req.body.id);
    res.status(200).json(CourseDetails);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { fetchAllCoursesList, fetchAllCourseById };
