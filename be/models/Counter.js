const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CounterSchema = new Schema(
  {
    _id: String,
    seq: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Counter", CounterSchema);
