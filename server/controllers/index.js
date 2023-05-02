module.exports = {
  ROLE: {
    APIS: require("./role/role.controller"),
    VALIDATOR: require("./role/role.validator"),
  },
  USER: {
    APIS: require("./user/user.controller"),
    VALIDATOR: require("./user/user.validator"),
  },

};
