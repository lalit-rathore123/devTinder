const express = require("express");
const app = express();

app.get("/test", (req, res) => {
  res.send("hello from test page!");
});
app.get("/", (req, res) => {
  res.send("hello from dashboard!");
});

app.listen(786, () => {
  console.log("app is listing on port 786");
});
 