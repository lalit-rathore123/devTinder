const userAuth = (req, res, next) => {
  const token = "user";
  const isAuthenticated = token === "user";
  if (isAuthenticated) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = {
  userAuth,
};
