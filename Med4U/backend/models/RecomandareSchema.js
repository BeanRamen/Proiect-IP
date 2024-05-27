const mongoose = require("mongoose");

const recomandareSchema = new mongoose.Schema({
  pacient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pacient",
    required: true,
  },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Recomandare = mongoose.model("Recomandare", recomandareSchema);

module.exports = Recomandare;
