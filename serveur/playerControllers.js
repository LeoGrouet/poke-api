const pool = require("./services/database");

const playerControllers = {
  createPlayer: async (req, res) => {
    try {
      const connection = await pool.connect(); // Utilisez pool.connect() pour obtenir une connexion

      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;

      // Utilisez des paramètres de requête pour éviter l'injection SQL
      const query = `INSERT INTO player (username, email, password) VALUES ($1, $2, $3)`;
      const result = await connection.query(query, [username, email, password]);

      // Libérez la connexion dans le pool après utilisation
      connection.release();

      res.status(201).send("Joueur créé avec succès");
    } catch (error) {
      console.error("Erreur lors de la création du joueur :", error);
      res.status(500).send("Erreur lors de la création du joueur");
    }
  },

  updatePlayer: async () => {
    // Ajoutez votre code pour la mise à jour du joueur ici
  },

  deletePlayer: async () => {
    // Ajoutez votre code pour la suppression du joueur ici
  },
};

module.exports = playerControllers;
