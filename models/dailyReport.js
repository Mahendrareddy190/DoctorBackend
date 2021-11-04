const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const dailyReportSchema = new mongoose.Schema(
  {
    patientId: {
      type: ObjectId,
      ref: "Patient",
      required: true,
    },
    conditionId: {
      type: ObjectId,
      ref: "Conditions",
      required: true,
    },
    suggestionId: {
      type: ObjectId,
      ref: "Suggestion",
      required: true,
    },
    dailyUpdate: {
      type: String,
      trim: true,
      required: true,
    },
    painLevel: {
      type: Number,
      trim: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Daily", dailyReportSchema);
