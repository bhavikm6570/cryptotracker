const DB = require("../models");
const { USER_TYPE } = require("../json/enums.json");
const apiResponseponse = require("../utils/api.response");
const message = require("../json/message.json");
const jwt = require("jsonwebtoken");

module.exports = {
  auth: ({ isTokenRequired = true, usersAllowed = [] } = {}) => {
    return async (req, res, next) => {
      const token = req.header("x-auth-token");
      if (isTokenRequired && !token) return apiResponseponse.BAD_REQUEST({ res, message: message.TOKEN_REQUIRED });
      if (!isTokenRequired && !token) return next();
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      let user
      // if(decoded.role == USER_TYPE.ADMIN) return next();
      if (decoded.role == USER_TYPE.USER) {
        user = await DB.user.findOne({ _id: decoded._id, isDeleted: false }).populate("role_id").lean();
      }
      if (decoded.role == USER_TYPE.VENDOR) {
        user = await DB.vendor.findOne({ _id: decoded._id, isDeleted: false }).populate("role_id").lean();
      }
      if (decoded.role == USER_TYPE.ADMIN) {
        user = await DB.user.findOne({ _id: decoded._id, isDeleted: false }).populate("role_id").lean();
      }
      if (!user) return apiResponseponse.UNAUTHORIZED({ res, message: message.INVALID_TOKEN });
      delete user.password;

      req.user = user;
      if (usersAllowed.length) {
        if (usersAllowed.includes("*")) return next();
        if (usersAllowed.includes(req.user.role_id.name)) return next();
        return apiResponseponse.UNAUTHORIZED({ res, message: message.UNAUTHORIZED });
      } else {
        if (req.user.role_id.name === USER_TYPE.ADMIN) return next();
        return apiResponseponse.UNAUTHORIZED({ res, message: message.UNAUTHORIZED });
      }
    };
  },
};
