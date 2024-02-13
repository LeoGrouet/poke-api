const player = require("../../server/models/playerModel");
const APIFetch = require("./apiCallController");

const teamController = {
  getMyTeam: async (req, res) => {
    if (!req.session.player) {
      const message = "Vous devez être connecté pour accéder à cette page";
      req.session.message = message;
      res.redirect("/login");

      return;
    }

    // get the team of the player [1, 2, 3]
    const team = req.session.player.team;

    // For each pokemon in the team, fetch data from the API pokemon with the id of the pokemon
    const pokemonData = [];
    const pokemonTypes = [];
    const pokemonNameFr = [];

    for (const id of team) {
      url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      pokemonData.push(data);
      pokemonTypes.push(data.types);
      console.log(pokemonData, pokemonTypes);
    }
    // Need to get : name, image, type, id, nameFr

    res.render("team", {
      team: team,
      types: pokemonTypes,
      nameFr: pokemonNameFr,
    });
  },

  addPokemonToTeam: async (req, res) => {
    const playerId = req.session.player._id;

    try {
      const user = await player.findById(playerId);

      const idOfPokemon = req.params.id;

      const currentUrl = req.get("referer");

      user.team.push(idOfPokemon);

      await user.save();

      res.redirect(currentUrl);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  },

  deletePokemonOfTeam: async (req, res) => {
    try {
      const idToRemove = parseInt(req.params.id, 10);
      const team = req.session.team;

      // Trouver l'index du Pokémon dans req.session.team
      const indexToRemove = team.findIndex(
        (pokemon) => pokemon.id === idToRemove
      );

      // Vérifier si le Pokémon a été trouvé
      if (indexToRemove !== -1) {
        // Supprimer l'élément à l'index spécifié de req.session.team
        team.splice(indexToRemove, 1);
      }

      // Rediriger vers la page d'équipe après la suppression
      res.redirect("/team");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = teamController;
