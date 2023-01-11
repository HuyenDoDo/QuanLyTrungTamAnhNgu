const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChiTietPDKSchema = new Schema(
  {
    maPDK: { type: Schema.Types.ObjectId, required: true },
    maLK: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChiTietPDK", ChiTietPDKSchema);
