const apiResponseponse = require("../utils/api.response");

module.exports = (schema) => async (req, res, next) => {
  const paths = Object.keys(schema);
  if (!paths.length) return next();
  if (!paths.includes("body") && !paths.includes("query") && !paths.includes("params")) return next();

  for (let path of paths) {
    const dataForValidation = req[path];
    const { value, error } = schema[path].validate(dataForValidation, {
      allowUnknown: false,
      stripUnknown: true,
    });
    if (error) {
      console.log("error", error);
      const context = error.details;
      return apiResponseponse.BAD_REQUEST({ res, message: `Validation failed for ${path}.`, data: { context } });
    }
    req[path] = value;
  }
  next();
};
