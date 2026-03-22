const express = require("express");
require("colors");
const app = express();
const port = 5000;
const connectDB = require("./config/dataBase");
const User = require("./models/user");
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    if (users?.length === 0) {
      return res.send("users nof found!");
    }

    res.status(200).json({
      message: "users found successfully !",
      users,
    });
  } catch (error) {
    res.status(500).send("something went worng!");
  }
});

app.get("/user", async (req, res) => {
  try {
    const firstName = req.query.firstName;

    const userByFirstName = await User.find({ firstName: firstName });
    console.log(firstName);
    if (!userByFirstName) {
      return res.status(404).json({
        message: "user not found !",
      });
    }
    res.status(200).json({
      message: "user found successfully !",
      user: userByFirstName,
    });
  } catch (error) {
    res.status(500).send("something went wrong !");
  }
});

app.post("/signup", async (req, res) => {
  const data = req.body;
  try {
    const user = new User(data);
    await user.save();
    res.status(201).json({
      message: "user created successfully !",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "error occurred while creating user !",
      error,
    });
  }
});

app.delete("/user", async (req, res) => {
  try {
    const id = req.body.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send("user not fount");
    }

    res.status(200).json({
      message: "user delete successfully !",
      user,
    });
  } catch (error) {
    res.status(500).send("something went wrong !");
  }
});

// app.patch("/user", async (req, res) => {
//   const id = req.body.id;
//   const data = req.body;

//   try {
//     const user = await User.findByIdAndUpdate(id, data, {
//       returnDocument: "after",
//     });
//     if (!user) {
//       return res.status(404).send("user not fount");
//     }

//     res.status(200).json({
//       message: "user updated  successfully !",
//       user,
//     });
//   } catch (error) {
//     res.status(500).send("something went wrong !");
//   }
// });

app.patch("/user", async (req, res) => {
  const { email, ...data } = req.body;
  try { 
    const newUser = await User.findOneAndUpdate({ email }, data, {
      returnDocument: "after",
    });

    res.status(200).json({
      message: "user updated successfully !",
      newUser,
    });
  } catch (error) {
    res.status(500).send("something went wrong !");
  }
});

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
