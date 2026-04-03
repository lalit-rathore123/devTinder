const express = require("express");
require("colors");
const app = express();
const port = 5000;
const connectDB = require("./config/dataBase");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/request");
const { userRouter } = require("./routes/user");
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:5173", "http://13.61.189.101"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    console.log("dataBase is connected !".bgYellow);
    app.listen(port, () => {
      console.log(`app is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("dataBase is not connected !".bgRed, err);
  });
