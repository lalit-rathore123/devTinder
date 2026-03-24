const jwt = require("jsonwebtoken");
const User = require("../models/user");
const SECRET = "305devTinder901@";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const isAuthenticatedToken = await jwt.verify(token, SECRET);

    const { id } = isAuthenticatedToken;
    if (!id) {
      res.status(401).send("Unauthorized or Invalid token !");
    }

    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found !");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized or Invalid token !",
      error: error.message,
    });
  }
};

module.exports = {
  userAuth,
};
