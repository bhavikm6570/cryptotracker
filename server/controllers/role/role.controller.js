const DB = require("../../models");
const messages = require("../../json/message.json");
const apiResponse = require("../../utils/api.response");
let { checkIfItemExists } = require("../../utils/utils")

module.exports = {
  createRole: async (req, res) => {
    if (checkIfItemExists({ name: req.body.name }, 'role')) return apiResponse.BAD_REQUEST({ res, message: messages.ALREADY_EXISTS });

    const role = await DB.role.create(req.body);
    return apiResponse.OK({ res, message: messages.SUCCESS, data: role });
  },

  getRole: async (req, res) => {
    const role = await DB.role.find(req.query).lean();
    return apiResponse.OK({ res, message: messages.SUCCESS, data: role });
  },
};
