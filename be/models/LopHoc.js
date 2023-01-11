const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LopHocSchema = new Schema(
  {
    maLop: { type: String, required: true, unique: true },
    tenLop: { type: String, required: true },
    maCT: { type: String, required: true },
    hocPhi: { type: Number, required: true },
    thoiLuong: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LopHoc", LopHocSchema);
