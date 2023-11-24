const mongoose = require("mongoose");

const Player = mongoose.model("Player", {
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
    unique: true,
  },
  team: {
    type: [String],
    default: [],
  },
  date_inscription: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Player;
