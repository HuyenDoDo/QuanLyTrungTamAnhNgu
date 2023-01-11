const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CaHocSchema = new Schema(
  {
    maCa: { type: Number, required: true, unique: true },
    thoiGian: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CaHoc", CaHocSchema);
