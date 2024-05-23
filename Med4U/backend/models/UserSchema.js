const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nume: { type: String, required: true },
  cnp: { type: String, required: true, unique: true },
  varsta: { type: Number, required: true },
  telefon: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  adresa: { type: String, required: true },
  locMunca: { type: String, required: true },
  descriere: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
