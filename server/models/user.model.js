const { hash } = require("bcryptjs");
const { Schema, model } = require("mongoose");
const message = require("../json/message.json");

const userSchema = new Schema(
  {
    email: { type: String, },
    user_name: { type: String, },
    password: { type: String },
    isDeleted: { type: Boolean, default: false, },
  },
  { timestamps: true, versionKey: false, }
);

userSchema.pre("save", async function (next) {
  try {
    const user = this;

    if (user.isModified("password") || user.isNew) { this.password = await hash(user.password, 10); next(); }
    else next();
  } catch (error) {
    console.log(message.passwordEncryptError, error);
  }
});

userSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret["password"];
    return ret;
  },
});

let userModel = model("user", userSchema, "user");
module.exports = userModel;
