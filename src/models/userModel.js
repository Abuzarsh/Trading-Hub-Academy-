const { connection } = require("../config/DbConnection");

const UserModel = {
  // Function to find user by Google ID
  findUserByGoogleId: (googleId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT google_id,display_name,email,photo FROM tb_user_details WHERE google_id = ?",
        [googleId],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        }
      );
    });
  },

  // Function to create or update a user based on email existence
  createUser: (googleId, displayName, email, photo) => {
    return new Promise((resolve, reject) => {
      // First, check if the email already exists
      connection.query(
        "SELECT * FROM tb_user_details WHERE email = ?",
        [email],
        (err, results) => {
          if (err) return reject(err);

          if (results.length > 0) {
            // If email exists, update the user information
            connection.query(
              "UPDATE tb_user_details SET google_id = ?, display_name = ?, photo = ? WHERE email = ?",
              [googleId, displayName, photo, email],
              (err, updateResults) => {
                if (err) return reject(err);
                resolve({
                  id: results[0].id, // Retain the existing user ID
                  google_id: googleId,
                  display_name: displayName,
                  email: email,
                  photo: photo,
                });
              }
            );
          } else {
            // If email doesn't exist, insert a new user
            connection.query(
              "INSERT INTO tb_user_details (google_id, display_name, email, photo) VALUES (?, ?, ?, ?)",
              [googleId, displayName, email, photo],
              (err, insertResults) => {
                if (err) return reject(err);
                resolve({
                  id: insertResults.insertId,
                  google_id: googleId,
                  display_name: displayName,
                  email: email,
                  photo: photo,
                });
              }
            );
          }
        }
      );
    });
  },

  UpdateSessionDetails: (email, sessionId, sessionExpiration, sessionData) => {
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE tb_user_details SET session_id=?, session_expires=?, session_data=? WHERE email=?";
      connection.query(
        query,
        [sessionId, sessionExpiration, sessionData, email],
        (err, results) => {
          if (err) {
            console.error("Error updating session in database:", err);
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  },
  fetchAllUsers: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM tb_user_details";
      connection.query(query, (err, results) => {
        if (err) {
          console.error("Error fetching all users:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  },
};

module.exports = UserModel;
