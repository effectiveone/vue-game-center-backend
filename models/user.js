const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  mail: { type: String, unique: true },
  password: { type: String, require: true },
  username: { type: String, require: true },
});

module.exports = mongoose.model("user", userSchema);
