const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
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

module.exports = {
  profileRouter,
};
