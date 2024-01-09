const loginController = {
  loginPage: async (req, res) => {
    res.render("log");
  },

  signinPage: async (req, res) => {
    res.render("signin");
  },
};

module.exports = loginController;
