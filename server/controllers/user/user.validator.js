const Joi = require("joi");
const validator = require("../../middleware/validator");
module.exports = {
  signup: validator({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
      user_name: Joi.string(),
      // role_id: Joi.string(),
    }),
  }),

  signIn: validator({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().when("is_social", { is: false, then: Joi.required() }),
      // role: Joi.string().valid(...Object.values(USER_TYPE)).required(),
    }),
  }),
  update: validator({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
      user_name: Joi.string(),
    }),
    params: Joi.object({
      _id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
    }),
  }),

  fetch: validator({
    query: Joi.object({
      _id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .message("Invalid ID"),
      user_name: Joi.string(),
      email: Joi.string(),
      search: Joi.string(),
      page: Joi.number().default(1),
      limit: Joi.number().default(100),
      sortBy: Joi.string().default("createdAt"),
      sortOrder: Joi.number().default(-1),
    }).unknown(true),
    params: Joi.object({
      _id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
    }),
  }),

};
