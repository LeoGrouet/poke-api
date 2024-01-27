const mongoose = require("mongoose");
const validator = require("validator");
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

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
