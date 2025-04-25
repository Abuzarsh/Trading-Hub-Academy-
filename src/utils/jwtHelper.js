const jwt = require("jsonwebtoken");

function setUser(user) {
  const token = jwt.sign({ user }, process.env.AUTH_KEY, { expiresIn: "30m" });
  return token;
}
function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.AUTH_KEY);
  } catch (err) {
    return null;
  }
}
module.exports = { setUser, getUser };
