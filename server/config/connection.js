const mongoose = require("mongoose");

mongoose.connect(
  // add your database connection here
  process.env.MONGODB_URI || "mongodb://localhost:27017/CodeCollective",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
