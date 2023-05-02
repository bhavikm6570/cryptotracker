const { Schema, model } = require("mongoose");

const { USER_TYPE } = require("../json/enums.json");

let roleSchema = new Schema(
  {
    name: { type: String, },
    description: { type: String, },
    isDeleted: { type: Boolean, default: false, },
  },
  { timestamps: true, versionKey: false, }
);

let roleModel = model("role", roleSchema, "role");

module.exports = roleModel;
