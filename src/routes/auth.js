const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");

const User = require("../models/user");
const { validatorSignUp } = require("../utils/validator");
const { userAuth } = require("../middlewares/userAuth");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, age, about, skill, gender } =
      req.body;
    validatorSignUp(req);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      about,
      skill,
      gender,
    });
    await user.save();
    res.status(201).json({
      message: "user created successfully !",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "error occurred while creating user!",
      error: error.message,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("Invalid credential");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("user not found");
    }

    const isPassCorrect = await user.isPasswordMatched(password);
    if (!isPassCorrect) {
      throw new Error("Invalid credential");
    }

    const token = await user.getJwtToken();

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 3600000),
    });
    res.status(200).send("login successfully !");
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
});

authRouter.post("/logout", async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "logout successfully !",
  });
});

module.exports = {
  authRouter,
};
