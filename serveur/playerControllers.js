const playerControllers = {
  createPlayer: async (req, res) => {
    const { username, email, password } = req.body.username;
  },

  updatePlayer: async () => {},
  deletePlayer: async () => {},
};
module.exports = playerControllers;
