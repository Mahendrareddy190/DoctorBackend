const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
    },
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
