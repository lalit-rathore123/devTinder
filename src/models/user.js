const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("enter a valid email", value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("enter a strong password", value);
        }
      },
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    gender: {
      type: String,
      validate(val) {
        if (!["male", "female", "other"].includes(val)) {
          throw new Error("enter a valid gender");
        }
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

UserSchema.methods.getJwtToken = async function () {
  const SECRET = "305devTinder901@";
  const user = this;
  const token = await jwt.sign({ id: user._id }, SECRET, { expiresIn: "1d" });
  return token;
};

UserSchema.methods.isPasswordMatched = async function (enteredPasswordByUser) {
  const user = this;
  return await bcrypt.compare(enteredPasswordByUser, user.password);
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
