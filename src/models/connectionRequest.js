const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },

    status: {
      type: String,
      enum: {
        values: ["accepted", "rejected", "interested", "ignored"],
        message: "{VALUE} is not a valid status!",
      },
      required: true,
    },
  },
  { timestamps: true },
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function () {
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error("You can't send request to yourself!");
  }
});

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);

module.exports = { ConnectionRequest };
