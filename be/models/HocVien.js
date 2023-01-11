const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HocVienSchema = new Schema(
  {
    hoTenLot: { type: String, required: true },
    ten: { type: String, required: true },
    ngaySinh: { type: Date },
    gioiTinh: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    sdt: { type: String, required: true },
    password: { type: String, required: true },
    diaChi: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HocVien", HocVienSchema);
