const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const suggestionSchema = new mongoose.Schema(
  {
    conditionId: {
      type: ObjectId,
      ref: "Conditions",
      required: true,
    },
    option1: {
      type: String,
      trim: true,
    },
    option2: {
      type: String,
      trim: true,
    },
    option3: {
      type: String,
      trim: true,
    },
    option4: {
      type: String,
      trim: true,
    },
    option5: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Suggestion", suggestionSchema);
