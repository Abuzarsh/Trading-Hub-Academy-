const express = require("express");
const passport = require("passport");
const UserModel = require("../models/userModel");
const { setUser } = require("../utils/jwtHelper");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const session_data = JSON.stringify(req.user);

    // console.log(req.user);

    const sessionExpiration = new Date(Date.now() + req.session.cookie.maxAge);
    // console.log("Authenticated user:", req.user);
    UserModel.UpdateSessionDetails(
      req.user.email,
      req.sessionID,
      sessionExpiration,
      session_data
    );
    const token = setUser(req.user);

    // Set user data in a cookie
    res.cookie("user", token, {
      sameSite: "None",
      secure: true,
      expires: sessionExpiration,
    });
    // Redirect to the frontend
    res.redirect(process.env.ACCEPT_URL);
  }
);

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }

    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Session destruction failed");
      }

      // Clear cookies
      res.clearCookie("connect.sid", { path: "/" }); // Clear session cookie
      res.clearCookie("user", { path: "/" }); // Clear user cookie
      res.clearCookie("session_id", { path: "/" });

      // Optionally, you can redirect or send a response
      res.send("Session cleared and logged out");
    });
  });
});
module.exports = router;
