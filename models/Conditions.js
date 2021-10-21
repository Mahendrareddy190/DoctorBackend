const mongoose = require("mongoose");
const ConditionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conditions", ConditionSchema);
