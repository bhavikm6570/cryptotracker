require("dotenv").config();
require("express-async-errors");
var cron = require("node-cron");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const apiResponse = require("./utils/api.response");
const errorHandler = require("./middleware/error.handler");

const app = express();
app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// set cron at every 1 minute
// cron.schedule("* * * * *", () => {
//     // checkStory();
//     console.log("running a task every minute");
// });

app.use("/api/v1", require("./routes/index"));

app.use((req, res) => apiResponse.NOT_FOUND({ res, message: "Oops! Somthing Went Wrong" }));

app.use(errorHandler);
module.exports = app;
