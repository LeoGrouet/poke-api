require("dotenv").config();
const { default: mongoose } = require("mongoose");

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("DB Connecté");
}

module.exports = {
  connectDB,
};
