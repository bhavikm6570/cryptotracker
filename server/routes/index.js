const app = require("express")();

app.get("/", (req, res) => res.send("Welcome to Crypto APIs!"));
app.use("/role", require("./role/role.routes"));
app.use("/user", require("./user/user.routes"));
module.exports = app;