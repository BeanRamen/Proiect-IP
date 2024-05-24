const Pacient = require("../models/PacientSchema");
const Medic = require("../models/MedicSchema");
const Admin = require("../models/AdminSchema");
const createError = require("../utilis/appError.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.signup = async (req, res, next) => {
  console.log("Received data:", req.body);
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
    } = req.body.user;

    const pacientByCNP = await Pacient.findOne({ cnp });
    const pacientByEmail = await Pacient.findOne({ email });

    if (pacientByCNP) {
      console.log(createError);
      return next(
        new createError(
          "Un cont cu acest CNP există deja. Vă rugăm să vă logați pentru a continua.",
          400
        )
      );
    }

    if (pacientByEmail) {
      console.log(createError);
      return next(
        new createError(
          "Un cont cu această adresă de email există deja. Vă rugăm să vă logați pentru a continua.",
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
      role: req.body.user.role || "pacient",
    });

    const token = jwt.sign({ _id: newPacient._id }, "secretkey123", {
      expiresIn: "90d",
    });

    res.status(201).json({
      status: "success",
      message: "Utilizatorul s-a înregistrat cu succes!",
      token,
      user: {
        _id: newPacient._id,
        cnp: newPacient.cnp,
        role: newPacient.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { userType, identifier, password } = req.body;

    let user;
    if (userType === "pacient") {
      user = await Pacient.findOne({ cnp: identifier });
    } else if (userType === "medic") {
      user = await Medic.findOne({ codParafa: identifier });
    } else if (userType === "admin") {
      user = await Admin.findOne({ email: identifier });
    }

    if (!user) {
      return next(new createError("Utilizatorul nu a fost găsit!", 404));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new createError("Parola incorectă", 401));
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, "secretkey123", {
      expiresIn: "90d",
    });

    res.status(200).json({
      status: "success",
      token,
      message: "V-ați autentificat cu succes",
      user: {
        _id: user._id,
        identifier:
          userType === "pacient"
            ? user.cnp
            : userType === "medic"
            ? user.codParafa
            : user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};
