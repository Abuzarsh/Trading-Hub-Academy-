const UserModel = require("../models/userModel");

const fetchAllUserList = async (req, res) => {
  try {
    const users = await UserModel.fetchAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { fetchAllUserList };
