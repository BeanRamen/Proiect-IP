const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// console.log(authController);

router.post("/login", authController.login);
router.post("/signup/pacient", authController.signupPacient);
router.post("/signup/medic", authController.signupMedic);
router.post("/signup/admin", authController.signupAdmin);
router.delete("/delete/medic/:id", authController.deleteMedic);

router.get("/medici", authController.getMedici);

module.exports = router;
