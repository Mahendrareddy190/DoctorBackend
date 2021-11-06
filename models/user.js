const mongoose = require("mongoose");
const uniquevALIDATOR = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: "string",
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: "string",
      required: true,
      trim: true,
    },
    type: {
      type: Number,
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniquevALIDATOR, { message: "email already exisits" });

module.exports = mongoose.model("User", userSchema);
