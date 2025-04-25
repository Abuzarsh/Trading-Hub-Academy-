const session = require("express-session");
// const MySQLStore = require("express-mysql-session")(session);
// const { connection } = require("./DbConnection");a

// const sessionStore = new MySQLStore(
//   {
//     schema: {
//       tableName: "tb_user_details",
//       columnNames: {
//         session_id: "session_id",
//         expires: "session_expires",
//         data: "session_data",
//       },
//     },
//     checkExpirationInterval: 1 * 60 * 1000, // Check expired sessions every 1 minute
//     expiration: 2 * 60 * 1000, // Sessions expire after 2 minutes
//   },
//   connection
// );

module.exports = session({
  secret: process.env.SESSION_SECRET || "your_secret_key",
  resave: false,
  saveUninitialized: false,
  // store: sessionStore, // Use your session store
  cookie: {
    maxAge: 30 * 60 * 1000, // Set cookie expiration time
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: true,
  },
});
