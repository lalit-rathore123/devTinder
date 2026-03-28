const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const { ConnectionRequest } = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

const safeToReturnData = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "about",
  "skill",
];

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const query = {
      toUserId: loggedInUser,
    };

    const requestData = await ConnectionRequest.find(query)
      .populate("fromUserId", safeToReturnData)
      .select(safeToReturnData);

    res.status(200).json({
      success: true,
      message: "connection request received",
      count: requestData.length,
      data: requestData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong !" + error.message,
    });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const connectionData = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser }, { fromUserId: loggedInUser }],
    })
      .populate("fromUserId", safeToReturnData)
      .populate("toUserId", safeToReturnData);

    const filterData = connectionData.map((row) => {
      if (row.fromUserId.equals(loggedInUser)) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.status(200).json({
      success: true,
      message: "Connection data retrieved successfully",
      count: filterData?.length,
      data: filterData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Erros :" + error.message,
    });
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const page = parseInt(req.query.page) || 1;
    let perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    if (page < 1 || perPage < 1) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid page or perPage value. Both should be greater than 0.",
      });
    }
    if (perPage > 100) {
      perPage = 10;
    }

    const myConnectionData = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser }, { fromUserId: loggedInUser }],
    });

    const hideMyConnectionFromFeed = new Set();

    myConnectionData.forEach((req) => {
      hideMyConnectionFromFeed.add(req.toUserId.toString());
      hideMyConnectionFromFeed.add(req.fromUserId.toString());
    });

    const feedData = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideMyConnectionFromFeed) } },
        {
          _id: { $ne: loggedInUser },
        },
      ],
    })
      .select(safeToReturnData)
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      success: true,
      message: "Feed data retrieved successfully",
      count: feedData?.length,
      data: feedData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Erros :" + error.message,
    });
  }
});

module.exports = {
  userRouter,
};
