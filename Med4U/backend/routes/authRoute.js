const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/login", authController.login);
router.post("/signup/pacient", authController.signupPacient);
router.post("/signup/medic", authController.signupMedic);
router.post("/signup/admin", authController.signupAdmin);
router.delete("/delete/medic/:id", authController.deleteMedic);
router.get("/medici", authController.getMedici);

router.get("/pacienti", authController.getPacienti);
router.get("/pacienti/:id", authController.getPacientDetails);

router.get("/ecgData/:pacientId", authController.getEcgData);

router.get("/recomandari/:pacientId", authController.getRecomandari);
router.post("/recomandari/:pacientId", authController.addRecomandare);
router.delete("/recomandari/:pacientId/:id", authController.deleteRecomandare);

module.exports = router;
