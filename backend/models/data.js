const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    name: { type: String },
    location: { type: String },
    verified: { type: Boolean },
  },
  { timestamps: true },
  { collection: "Maindata" }
);
const Maindata = mongoose.model("datamodel", dataSchema, "Maindata");
module.exports = Maindata;
