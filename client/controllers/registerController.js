const player = require("../../server/models/playerModel");
const bcrypt = require("bcrypt");

const registerController = {
  login: (req, res) => {
    const message = req.session.message;
    req.session.message = null;
    res.render("login", { message });
  },

  signup: (req, res) => {
    res.render("signup");
  },

  signupPost: async (req, res) => {
    try {
      const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };

      const existingUser = await player.findOne({ username: data.username });

      if (existingUser) {
        return res.send("Ce pseudo existe déjà ! Choisissez-en un autre !");
      }

      const saltsRound = 10;
      const hashPassword = await bcrypt.hash(data.password, saltsRound);
      data.password = hashPassword;

      await player.create(data);

      res.redirect("/login");
    } catch (error) {
      console.error(error);
      res.status(500).send("Quelque chose cloche");
    }
  },

  loginPost: async (req, res) => {
    try {
      const user = await player.findOne({ username: req.body.username });

      if (!user) {
        res.redirect("/signup");
        return;
      }
      const password = req.body.password;
      const comparePassword = await bcrypt.compare(password, user.password);
      if (comparePassword) {
        req.session.player = user;
        res.redirect("/");
      } else {
        return res.send("Mot de passe incorect");
      }
    } catch (error) {
      return res.send("Quelque chose cloche");
    }
  },
};

module.exports = registerController;
