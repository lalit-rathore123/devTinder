const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 100,
    },
    lastName: {
      type: String,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    gender: {
      type: String,
      validate: {
        validator: function (val) {
          if (!["male", "female", "other"].includes(val)) {
            throw new error();
          }
        },
      },
    },

    about: {
      type: String,
      default: "this is all about me !",
    },

    skill: {
      type: [String],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
