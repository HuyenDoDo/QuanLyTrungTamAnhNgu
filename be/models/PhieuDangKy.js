const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhieuDangKySchema = new Schema(
  {
    maHV: { type: String, required: true },
    tongHocPhi: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PhieuDangKy", PhieuDangKySchema);
