const { getUser } = require("../utils/jwtHelper");

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

const authenticateUser = (req, res, next) => {
  const token = req.cookies.user;
  if (!token) {
    return res.status(401).send("Unauthorized"); // Token not provided
  }

  // Assuming getUser is a function that verifies the token and returns user data
  const verifytoken = getUser(token);

  if (verifytoken) {
    req.user = verifytoken; // Attach the verified user to the request
    next(); // Call the next middleware or route handler
  } else {
    return res.status(403).send("Forbidden"); // Invalid token
  }
};

module.exports = { authenticateUser };
