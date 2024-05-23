const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicSchema = new Schema({
  nume: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  specializare: {
    type: String,
    required: true,
  },
  telefon: {
    type: String,
    required: true,
  },
  codParafa: {
    type: String,
    required: true,
    unique: true,
  },
  parola: {
    type: String,
    required: true,
  },
});

const Medic = mongoose.model("Medic", MedicSchema);

module.exports = { Medic };
