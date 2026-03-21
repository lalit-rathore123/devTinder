const express = require("express");
const { userAuth } = require("./middlewares/userAuth");
const app = express();
const port = 5000;

app.use("/user", userAuth);

  app.delete("/user", (rq, res) => {
    res.send("all user data deleted.");
  });
app.get("/user", (rq, res) => {
  res.send("all user data sent.");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
