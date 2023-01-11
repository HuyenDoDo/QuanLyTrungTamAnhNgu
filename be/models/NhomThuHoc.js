const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NhomThuHocSchema = new Schema(
  {
    maNTH: { type: Number, required: true, unique: true },
    nhomThu: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NhomThuHoc", NhomThuHocSchema);
