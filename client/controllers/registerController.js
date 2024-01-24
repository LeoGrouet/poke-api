const playerController = require("../../serveur/controllers/playerController");

const registerController = {
  loginPage: async (req, res) => {
    res.render("log");
  },
  register: async (req, res) => {
    res.render("signin");
  },
  signin: async (req, res) => {
    const newPlayer = await playerController.newPlayer();
  },
};

module.exports = registerController;
