const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    DoctorId: {
      type: ObjectId,
      ref: "Doctor",
    },
    conditionId: {
      type: ObjectId,
      ref: "Conditions",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
    },
    age: {
      type: Number,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    location: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
