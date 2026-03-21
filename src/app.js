const express = require("express");
const { userAuth } = require("./middlewares/userAuth");
const app = express();
const port = 5000;

app.get("/user", (rq, res) => {
  throw new Error("User not found");
});
app.use((err, req, res, next) => {
  res.status(500).send({ error: "something went wrong" });
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
