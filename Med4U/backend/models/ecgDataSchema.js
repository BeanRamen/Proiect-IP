const mongoose = require("mongoose");

const ecgDataSchema = new mongoose.Schema({
  pacientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pacient",
    required: true,
  },
  puls: Number,
  temperatura: Number,
  ecg: [Number],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ECGData = mongoose.model("ECGData", ecgDataSchema);

module.exports = ECGData;
