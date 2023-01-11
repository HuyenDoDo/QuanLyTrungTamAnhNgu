const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LopKhoaSchema = new Schema(
  {
    maLK: { type: String, required: true, unique: true },
    hocPhi: { type: Number, required: true },
    soLuongDuKien: { type: Number, required: true },
    soLuongHienTai: { type: Number, required: true },
    thoiLuong: { type: Number, required: true },
    maLop: { type: String, required: true },
    maKH: { type: String, required: true },
    maCa: { type: Number, required: true },
    maNTH: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LopKhoa", LopKhoaSchema);
