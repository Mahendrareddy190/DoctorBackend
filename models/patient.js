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
      default: false,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
