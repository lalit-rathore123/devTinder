const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://lalit:305mongodb901@cluster0.ntuco.mongodb.net/devTinder?appName=Cluster0",
  );
};

module.exports = connectDB;
