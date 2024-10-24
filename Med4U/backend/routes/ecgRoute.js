const express = require("express");
const ecgController = require("../controllers/ecgController");
const router = express.Router();

router.get("/", ecgController.getAllEcgData);

module.exports = router;
