const { connection } = require("../config/DbConnection");

const CourseModel = {
  fetchAllCoursesList: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM courses";
      connection.query(query, (err, results) => {
        if (err) {
          console.error("Error fetching all courses:", err);
          console.error("Error fetching all courses:", err);
          return reject(err);
        }

        const courses = results.map((course) => ({
          ...course,
          details: course.details.split("+"), // Convert string into an array
        }));
        resolve(courses);
      });
    });
  },

  fetchCourseById: (id) => {
    return new Promise((resolve, reject) => {
      if (!id || typeof id !== "number") {
        return reject(new Error("Invalid ID provided"));
      }

      const query = "SELECT * FROM courses WHERE id = ?";
      connection.query(query, [id], (err, results) => {
        if (err) {
          console.error(`Error fetching course with ID ${id}:`, err);
          return reject(err);
        }

        if (results.length === 0) {
          return reject(new Error(`No course found with ID ${id}`));
        }

        const course = {
          ...results[0],
          details: results[0].details.split("+"), // Convert string into an array
        };

        resolve(course);
      });
    });
  },
};

module.exports = CourseModel;
