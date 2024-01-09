const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const playerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    type: String,
    required: true,
    validate(v) {
      if (!validator.isLength(v, { min: 4, max: 20 }))
        throw new Error(
          "Le mot de passe doit faire entre 4 et 20 caractères !"
        );
    },
  },
  team: {
    type: [String],
    default: [],
  },
  date_inscription: {
    type: Date,
    default: Date.now,
  },
  authTokens: [
    {
      authToken: {
        type: String,
        required: true,
      },
    },
  ],
});

playerSchema.methods.generateAuthTokenAndSavePlayer = async function () {
  const authToken = jwt.sign({ _id: this._id.toString() }, "foo");
  this.authTokens.push({
    authToken,
  });
  await this.save();
  return authToken;
};

playerSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 8);
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
