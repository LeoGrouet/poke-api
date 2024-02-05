const player = require("../../serveur/models/playerModel");
const bcrypt = require("bcrypt");

const registerController = {
  login: (req, res) => {
    const message = req.session.message;
    req.session.message = null; // Efface le message après l'avoir récupéré
    res.render("login", { message });
  },

  signup: (req, res) => {
    res.render("signup");
  },

  signupPost: async (req, res) => {
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    const existingUser = await player.findOne({ username: data.username });

    if (existingUser) {
      res.send("Ce pseudo existe déja ! Choisis en un autre !");
    } else {
      const saltsRound = 10;
      const hashPassword = await bcrypt.hash(data.password, saltsRound);
      data.password = hashPassword;

      const userdata = await player.insertMany(data);
      console.log(userdata);
    }
    res.redirect("/login");
  },

  loginPost: async (req, res) => {
    try {
      const check = await player.findOne({ username: req.body.username });
      if (!check) {
        res.send("Ce pseudo n'existe pas !");
      }
      const password = req.body.password;
      const comparePassword = await bcrypt.compare(password, check.password);
      if (comparePassword) {
        req.session.player = check;
        res.redirect("/");
      } else {
        res.send("Mot de passe incorect");
      }
    } catch (error) {
      res.send("Quelque chose cloche");
    }
  },
};

module.exports = registerController;
