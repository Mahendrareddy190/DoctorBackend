const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const notifySchema = new mongoose.Schema(
  {
    userId: { type: ObjectId, ref: "User" },
    message: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notifySchema);
