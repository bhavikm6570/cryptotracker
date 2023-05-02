const messages = require("../../json/message.json");
const apiResponse = require("../../utils/api.response");
const DB = require("../../models");
const helper = require("../../utils/utils");
let { checkIfItemExists } = require("../../utils/utils")
module.exports = exports = {
  /* user signin api */
  signIn: async (req, res) => {

    /*check user exist or not in systeam*/
    let user = await DB.user.findOne({ email: req.body.email }).lean();
    if (!user) {
      user = await user.create(req.body)
    }
    if (!req.body.is_social && !req.body.signup) {
      const isPasswordMatch = await helper.comparePassword({ password: req.body.password, hash: user.password });
      if (!isPasswordMatch) return apiResponse.BAD_REQUEST({ res, message: messages.INVALID_PASSWORD });
    }

    let token = helper.generateToken({ data: { _id: user._id } });

    let { isDeleted, password, ...userData } = user;
    return apiResponse.OK({ res, message: messages.SUCCESS, data: { ...userData, token, }, });
  },

  /* user signup api */
  signUp: async (req, res) => {
    /*check if email are exist or not in systeam*/
    if (await checkIfItemExists({ email: req.body.email }, 'user')) return apiResponse.BAD_REQUEST({ res, message: messages.EMAIL_ALREADY_EXISTS });
    else {
      await DB.user.create(req.body);
    }

    req.body.signup = true
    exports.signIn(req, res);
  },

};  
