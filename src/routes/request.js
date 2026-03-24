const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionReq", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "connection request sent by " + user.firstName + " !",
    });
  } catch (error) {
    res.status(500).json({
      message: "something went!",
      error: error.message,
    });
  }
});

module.exports = {
  requestRouter,
};
