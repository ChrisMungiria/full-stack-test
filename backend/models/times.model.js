const mongoose = require("mongoose");

const timesSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  loginTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  logoutTime: {
    type: Date,
  },
});

const Times = mongoose.model("Times", timesSchema);
module.exports = Times;
