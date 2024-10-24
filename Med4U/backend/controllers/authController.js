const Pacient = require("../models/PacientSchema");
const Medic = require("../models/MedicSchema");
const Admin = require("../models/AdminSchema");
const Recomandare = require("../models/recomandareSchema");
const EcgData = require("../models/ecgDataSchema");
const createError = require("../utilis/appError.js");
const bcrypt = require("bcryptjs");

const loginUser = async (user, password, role, res, next) => {
  if (!user) {
    return next(new createError(`${role} nu a fost găsit!`, 404));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return next(new createError("Parola incorectă", 401));
  }

  res.status(200).json({
    status: "success",
    message: `V-ați autentificat cu succes ca ${role}`,
    user: {
      _id: user._id,
      role: role,
    },
  });
};

const login = async (req, res, next) => {
  try {
    const { email, cnp, codParafa, password, userType } = req.body;

    if (userType === "pacient") {
      const pacient = await Pacient.findOne({ cnp });
      await loginUser(pacient, password, "pacient", res, next);
    } else if (userType === "medic") {
      const medic = await Medic.findOne({ codParafa });
      await loginUser(medic, password, "medic", res, next);
    } else if (userType === "admin") {
      const admin = await Admin.findOne({ email });
      await loginUser(admin, password, "admin", res, next);
    } else {
      return next(new createError("Tip utilizator invalid", 400));
    }
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

const signupPacient = async (req, res, next) => {
  try {
    const {
      nume,
      cnp,
      varsta,
      numar_telefon,
      email,
      adresa,
      loc_munca,
      specificatii,
      password,
    } = req.body;

    const pacientByCNP = await Pacient.findOne({ cnp });
    const pacientByEmail = await Pacient.findOne({ email });

    if (pacientByCNP || pacientByEmail) {
      return next(
        new createError(
          "Un cont cu acest CNP sau adresă de email există deja. Vă rugăm să vă logați pentru a continua.",
          400
        )
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newPacient = await Pacient.create({
      nume,
      cnp,
      varsta,
      numar_telefon,
      email,
      adresa,
      loc_munca,
      specificatii,
      password: hashedPassword,
      role: "pacient",
    });

    res.status(201).json({
      status: "success",
      message: "Utilizatorul s-a înregistrat cu succes!",
      user: {
        _id: newPacient._id,
        cnp: newPacient.cnp,
        role: "pacient",
      },
    });
  } catch (error) {
    next(error);
  }
};

const signupMedic = async (req, res, next) => {
  try {
    const { nume, codParafa, specializare, email, numar_telefon, password } =
      req.body;

    const medicByCodParafa = await Medic.findOne({ codParafa });
    const medicByEmail = await Medic.findOne({ email });

    if (medicByCodParafa || medicByEmail) {
      return next(
        new createError(
          "Un cont cu acest cod de parafa sau adresă de email există deja. Vă rugăm să vă logați pentru a continua.",
          400
        )
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newMedic = await Medic.create({
      nume,
      codParafa,
      specializare,
      email,
      numar_telefon,
      password: hashedPassword,
      role: "medic",
    });

    res.status(201).json({
      status: "success",
      message: "Utilizatorul s-a înregistrat cu succes!",
      user: {
        _id: newMedic._id,
        codParafa: newMedic.codParafa,
        role: "medic",
      },
    });
  } catch (error) {
    next(error);
  }
};

const signupAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const adminByEmail = await Admin.findOne({ email });

    if (adminByEmail) {
      return next(
        new createError(
          "Un cont cu această adresă de email există deja. Vă rugăm să vă logați pentru a continua.",
          400
        )
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = await Admin.create({
      email,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      status: "success",
      message: "Adminul s-a înregistrat cu succes!",
      user: {
        _id: newAdmin._id,
        email: newAdmin.email,
        role: "admin",
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteMedic = async (req, res, next) => {
  try {
    const medicId = req.params.id;
    const deletedMedic = await Medic.findByIdAndDelete(medicId);
    if (!deletedMedic) {
      return next(new createError("Medicul nu a fost găsit.", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Medicul a fost șters cu succes.",
      deletedMedic,
    });
  } catch (error) {
    next(error);
  }
};

const getMedici = async (req, res, next) => {
  try {
    const medici = await Medic.find();
    res.status(200).json(medici);
  } catch (error) {
    next(error);
  }
};

const getPacienti = async (req, res, next) => {
  try {
    const { medicId } = req.query;
    console.log("Fetching pacients for medic with ID:", medicId);
    const pacients = await Pacient.find({ medic: medicId });
    res.status(200).json(pacients);
  } catch (error) {
    console.error("Error fetching pacients:", error);
    next(error);
  }
};

const getPacient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pacient = await Pacient.findById(id);
    if (!pacient) {
      return res.status(404).json({ message: "Pacient not found" });
    }
    res.status(200).json(pacient);
  } catch (error) {
    console.error("Error fetching pacient:", error);
    next(error);
  }
};

const getRecomandari = async (req, res, next) => {
  try {
    console.log(
      "Fetching recommendations for patient ID:",
      req.params.pacientId
    );
    const recomandari = await Recomandare.find({
      pacient: req.params.pacientId,
    });
    res.json(recomandari);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addRecomandare = async (req, res, next) => {
  try {
    if (!req.body.text || !req.body.text.trim()) {
      return res
        .status(400)
        .json({ error: "Textul recomandării nu poate fi gol" });
    }

    console.log("Adding recommendation for patient ID:", req.params.pacientId);
    const newRecomandare = new Recomandare({
      pacient: req.params.pacientId,
      text: req.body.text,
      createdAt: new Date(),
    });

    const savedRecomandare = await newRecomandare.save();
    res.json(savedRecomandare);
  } catch (error) {
    console.error("Error adding recommendation:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteRecomandare = async (req, res, next) => {
  try {
    console.log("Deleting recommendation with ID:", req.params.id);
    await Recomandare.findByIdAndDelete(req.params.id);
    res.json({ message: "Recomandare deleted" });
  } catch (error) {
    console.error("Error deleting recommendation:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getPacientDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Fetching details for pacientId:", id);

    const pacient = await Pacient.findById(id);
    if (!pacient) {
      console.log("Pacient not found for id:", id);
      return res.status(404).json({ message: "Pacient not found" });
    }

    console.log("Pacient found:", pacient);

    const ecgData = await EcgData.find({ pacientId: id }).sort({
      createdAt: -1,
    });
    if (!ecgData.length) {
      console.log("No EcgData found for pacientId:", id);
      return res.status(404).json({ message: "ecgData not found" });
    }

    console.log("EcgData found:", ecgData);

    res.status(200).json({ pacient, ecgData });
  } catch (error) {
    console.error("Error fetching pacient details:", error);
    next(error);
  }
};

const getEcgData = async (req, res, next) => {
  try {
    const { pacientId } = req.params;
    console.log("Fetching ECG data for pacientId:", pacientId);

    const ecgData = await EcgData.find({ pacientId }).sort({ createdAt: -1 });
    if (!ecgData.length) {
      console.log("No EcgData found for pacientId:", pacientId);
      return res.status(404).json({ message: "EcgData not found" });
    }

    console.log("EcgData found:", ecgData);

    res.status(200).json(ecgData[0]);
  } catch (error) {
    console.error("Error fetching ECG data:", error);
    next(error);
  }
};

module.exports = {
  login,
  signupPacient,
  signupMedic,
  signupAdmin,
  deleteMedic,
  getMedici,
  getPacienti,
  getPacient,
  getRecomandari,
  addRecomandare,
  deleteRecomandare,
  getPacientDetails,
  getEcgData,
};
