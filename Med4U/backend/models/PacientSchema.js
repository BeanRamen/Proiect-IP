const mongoose = require("mongoose");

const pacientSchema = new mongoose.Schema({
  nume: {
    type: String,
    required: true,
  },
  cnp: {
    type: String,
    required: true,
    unique: true,
  },
  varsta: Number,
  numar_telefon: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  adresa: String,
  loc_munca: String,
  specificatii: String,
  password: {
    type: String,
    required: true,
  },
  parafa: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pacient = mongoose.model("Pacient", pacientSchema);

module.exports = Pacient;
