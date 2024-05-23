class createError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    //Error.captureStackTrace este o metodă specifică motorului V8 (folosit de Node.js și de browserul Chrome) care permite capturarea urmăririi stivei pentru un obiect de eroare.
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = createError;
