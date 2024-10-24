const mongoose = require("mongoose");
const EcgData = require("./models/ecgDataSchema");

const updateEcgDataPacientId = async () => {
  await mongoose.connect(
    "mongodb+srv://med4uip:Qwerty123@med4u.6oxncqx.mongodb.net/authentication?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  const pacientId = "66546fb70a49a5e28c6c9e66"; // ID-ul pacientului
  const ecgDataId = "665703863fbe320563cc25b0"; // ID-ul documentului EcgData

  console.log("Fetching EcgData by ID:", ecgDataId);
  const ecgData = await EcgData.findById(ecgDataId);
  if (ecgData) {
    console.log("Before update:", ecgData);
    ecgData.pacientId = mongoose.Types.ObjectId(pacientId);
    await ecgData.save();
    console.log("EcgData updated:", ecgData);
  } else {
    console.log("EcgData not found");
  }

  await mongoose.disconnect();
};

updateEcgDataPacientId().catch((error) => {
  console.error("Error updating EcgData:", error);
  mongoose.disconnect();
});
