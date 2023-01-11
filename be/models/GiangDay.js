const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GiangDaySchema = new Schema(
  {
    maGiangVien: { type: String, required: true },
    maLK: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GiangDay", GiangDaySchema);
