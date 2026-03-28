const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const User = require("../models/user");
const { ConnectionRequest } = require("../models/connectionRequest");
const requestRouter = express.Router();

requestRouter.post(
  "/sendConnectionReq/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["rejected", "interested"];
      const isValidStaus = allowedStatus.includes(status);

      if (!isValidStaus) {
        return res.status(400).json({
          success: false,
          message: "this is not valid status !",
        });
      }

      const isReqIdExist = await User.findById(toUserId);
      if (!isReqIdExist) {
        return res.status(404).json({
          message: "user not found!",
        });
      }

      const isReqAlreadyExist = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (isReqAlreadyExist) {
        return res.status(400).json({
          success: false,
          message: "request already exist !",
        });
      }

      const createReq = await new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      await createReq.save();

      res.status(201).json({
        success: true,
        message: "request sent successfully !",
      });
    } catch (error) {
      res.status(500).json({
        message: "something went wrong!",
        error: error.message,
      });
    }
  },
);

requestRouter.post(
  "/reviewConnectionReq/:status/:reqUserId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      const { status, reqUserId } = req.params;
      const allowedStatus = ["accepted", "rejected"];
      const isValidStatus = allowedStatus.includes(status);
      if (!isValidStatus) {
        return res.status(400).json({
          success: false,
          message: "status is not valid !",
        });
      }

      const isRequestExist = await ConnectionRequest.findOne({
        _id: reqUserId,
        status: "interested",
        toUserId: loggedInUserId,
      })

      if (!isRequestExist) {
        return res.status(400).json({
          success: false,
          message: "this req is not exist !",
        });
      }
      isRequestExist.status = status;
      const data = await isRequestExist.save();
      res.status(200).json({
        success: true,
        message: `request is ${status} !`,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "something went wrog ! " + error.message,
      });
    }
  },
);

module.exports = {
  requestRouter,
};
