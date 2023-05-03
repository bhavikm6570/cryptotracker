const mongoose = require("mongoose");
const debugDb = require("debug")("db");

mongoose
  .connect("mongodb://localhost:27017/crypto")
  .then(() => {
    console.log("🎯 connected");
    // debugDb("🎯 connected");
  })
  .catch((err) => {
    debugDb(err);
  });
