const EcgData = require("../models/ecgDataSchema");

// Funcția pentru a aduce toate datele din ecgdatas
const getAllEcgData = async (req, res, next) => {
  try {
    const ecgData = await EcgData.find().sort({ createdAt: -1 });

    if (!ecgData.length) {
      return res.status(404).json({ message: "EcgData not found" });
    }

    res.status(200).json(ecgData);
  } catch (error) {
    console.error("Error fetching ECG data:", error);
    next(error);
  }
};

module.exports = {
  getAllEcgData,
};
