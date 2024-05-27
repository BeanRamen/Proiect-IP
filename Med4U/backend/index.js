const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const DB_URL =
  "mongodb+srv://med4uip:Qwerty123@med4u.6oxncqx.mongodb.net/authentication?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(cors());
app.use(express.json());

app.options("*", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.set("Access-Control-Allow-Headers", "*");
  res.send();
});

const authRoute = require("./routes/authRoute");
app.use("/api/auth", authRoute);

mongoose
  .connect(DB_URL, connectionParams)
  .then(() => console.info("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
