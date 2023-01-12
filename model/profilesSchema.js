const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    imgpath: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// create model

const profiles = new mongoose.model("profiles", userSchema);

module.exports = profiles;
