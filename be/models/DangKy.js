const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DangKySchema = new Schema(
  {
    maHocVien: { type: String, required: true },
    maLK: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DangKy", DangKySchema);
