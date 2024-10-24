const mongoose = require("mongoose");

const ecgDataSchema = new mongoose.Schema({
  pacientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pacient",
    required: true,
  },
  temperatura: String,
  puls: String,
  ecg: String,
  umiditate: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const EcgData = mongoose.model("EcgData", ecgDataSchema);

module.exports = EcgData;
