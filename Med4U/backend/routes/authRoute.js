// backend/routes/authRoute.js

const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/login", authController.login);
router.post("/signup/pacient", authController.signupPacient);
router.post("/signup/medic", authController.signupMedic);
router.post("/signup/admin", authController.signupAdmin);
router.delete("/delete/medic/:id", authController.deleteMedic);
router.get("/medici", authController.getMedici);

router.get("/pacienti", authController.getPacienti); // Route to get all patients for a medic
router.get("/pacienti/:id", authController.getPacient); // Route to get a single patient by ID

module.exports = router;
