const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KhoaHocSchema = new Schema(
  {
    maKH: { type: String, required: true, unique: true },
    tenKH: { type: String, required: true },
    tinhTrang: { type: Number, required: true },
    ngayBatDau: { type: Date, required: true },
    ngayKetThuc: { type: Date, required: true },
    hanDangKy: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("KhoaHoc", KhoaHocSchema);
