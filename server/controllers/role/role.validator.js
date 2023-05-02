const Joi = require("joi");
const { USER_TYPE } = require("../../json/enums.json");
const validator = require("../../middleware/validator");
module.exports = {
  createRole: validator({
    body: Joi.object({
      name: Joi.string().valid(...Object.values(USER_TYPE)).required(),
      description: Joi.string(),
    }),
  }),
};
