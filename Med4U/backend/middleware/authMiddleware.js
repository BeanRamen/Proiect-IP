const jwt = require("jsonwebtoken");
const createError = require("../utilis/appError");

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log("Token received:", token);
  }

  if (!token) {
    return next(
      new createError(
        "Nu sunteți autentificat. Vă rugăm să vă autentificați pentru a avea acces.",
        401
      )
    );
  }

  try {
    const decoded = jwt.verify(token, "secretkey123"); // Asigură-te că secretul este același
    console.log("Token decoded:", decoded);

    req.user = decoded; // Stochează datele utilizatorului decodate în request pentru a fi accesate în continuare

    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return next(new createError("Token invalid. Autentificarea a eșuat.", 401));
  }
};

module.exports = protect;
