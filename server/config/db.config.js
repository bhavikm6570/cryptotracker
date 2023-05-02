const mongoose = require("mongoose");
const debugDb = require("debug")("db");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    debugDb("🎯 connected");
  })
  .catch((err) => {
    debugDb(err);
  });
