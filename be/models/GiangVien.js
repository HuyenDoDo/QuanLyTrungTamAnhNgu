const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GiangVienSchema = new Schema(
  {
    maGV: { type: Number, required: true, unique: true },
    hoTenLot: { type: String, required: true },
    ten: { type: String, required: true },
    ngaySinh: { type: String, required: true },
    email: { type: String, required: true },
    sdt: { type: String, required: true },
    diaChi: { type: String, required: true },
    // matKhau: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("GiangVien", GiangVienSchema);
