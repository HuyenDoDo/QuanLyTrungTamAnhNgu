const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChuongTrinhSchema = new Schema(
  {
    maCT: { type: String, required: true, unique: true },
    tenCT: { type: String, required: true },
    moTa: { type: String, required: true },
    mkdownText: { type: String, required: true },
    mkdownHtml: { type: String, required: true },
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChuongTrinh", ChuongTrinhSchema);
