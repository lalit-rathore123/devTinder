const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const { profileEditValidator } = require("../utils/validator");
const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "user found !",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went!",
      error: error.message,
    });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    await profileEditValidator(req);
    const loggedInUser = req.user;

    // Object.keys(req.body).every((key) => (loggedInUser[key] = req.body[key]));
    Object.assign(loggedInUser, req.body);
    await loggedInUser.save();

    res.status(200).json({
      success: true,
      message: "profile edit successfuly!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong !",
      error: error.message,
    });
  }
});

module.exports = {
  profileRouter,
};
