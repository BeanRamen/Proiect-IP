const mongoose = require("mongoose");

const pacientSchema = new mongoose.Schema(
  {
    nume: {
      type: String,
      required: [true, "Numele este necesar"],
    },
    cnp: {
      type: String,
      required: [true, "CNP-ul este necesar"],
      unique: true,
    },
    varsta: {
      type: Number,
      required: [true, "Vârsta este necesară"],
    },
    numar_telefon: {
      type: String,
      required: [true, "Numărul de telefon este necesar"],
    },
    email: {
      type: String,
      required: [true, "Adresa de email este necesară"],
      unique: true,
    },
    adresa: {
      type: String,
      required: [true, "Adresa este necesară"],
    },
    loc_munca: {
      type: String,
      required: [true, "Locul de muncă este necesar"],
    },
    descriere: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Parola este necesară"],
    },
    role: {
      type: String,
      enum: ["pacient", "medic"],
      default: "pacient",
    },
  },
  { collection: "user" }
);

const Pacient = mongoose.model("Pacient", pacientSchema);

module.exports = Pacient;
