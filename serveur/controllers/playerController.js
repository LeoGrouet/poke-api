const Player = require("../models/playerModel");

const playerControllers = {
  newPlayer: async (req, res) => {
    const newPlayer = new Player({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      await newPlayer.save();
      console.log("New Player added successfully!");
      res.redirect("/"); // Redirige vers une page de liste de membres
    } catch (err) {
      console.log(err);
      res.status(500).send("Error adding player");
    }
  },

  findOnePlayer: async (req, res) => {
    try {
      const { email, password } = req.body;
      const player = await Player.findOne({ email, passwordHash: password });
      if (!player) {
        return res.status(404).send("Player not found");
      }
      return player;
    } catch (err) {
      console.log(err);
      res.status(500).send("Error retrieving Player");
    }
  },

  findAllPlayers: async (req, res) => {
    try {
      const players = await Player.find({});
      return players;
    } catch (err) {
      console.log(err);
      res.status(500).send("Error retrieving Players");
    }
  },

  deletePlayer: async (req, res) => {
    const memberId = req.params.id; // l'ID du membre à supprimer
    try {
      const deletedPlayer = await Player.findByIdAndRemove(memberId);
      console.log("Player deleted successfully!");
      return deletedPlayer;
    } catch (err) {
      console.log(err);
      res.status(500).send("Error deleting Player");
    }
  },
};

module.exports = playerControllers;
