const apiResponse = require("../utils/api.response");
const messages = require("../json/message.json");
const { MulterError } = require("multer");
const { JsonWebTokenError } = require("jsonwebtoken")

module.exports = async (error, req, res, next) => {
  console.log(`Error at PATH: [${req.method}] [${req.path}]: ${error.message}.`);
  if (error.message) {
    if (error.message.toLowerCase().includes("duplicate key")) return apiResponse.DUPLICATE_VALUE({ res, data: { context: error.message } });
    if (error.message.toLowerCase().includes("jwt expired")) return apiResponse.UNAUTHORIZED({ res, data: { context: error.message } });
  }
  if (error instanceof MulterError) {
    return apiResponse.BAD_REQUEST({ res, message: messages.INVALID_FILE, data: { context: error.code } });
  }
  if (error instanceof JsonWebTokenError) {
    return apiResponse.UNAUTHORIZED({ res, message: messages.INVALID_TOKEN, data: { context: error.message } });
  }
  console.log("STACK: ", error.stack);
  return apiResponse.CATCH_ERROR({ res, message: messages.INTERNAL_SERVER_ERROR, data: { context: error.message } });
};