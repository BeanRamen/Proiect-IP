const mongoose = require("mongoose");

const medicSchema = new mongoose.Schema({
  nume: {
    type: String,
    required: true,
  },
  codParafa: {
    type: String,
    required: true,
    unique: true,
  },
  specializare: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  numar_telefon: String,
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "medic",
  },
});

const Medic = mongoose.model("Medic", medicSchema);

module.exports = Medic;
