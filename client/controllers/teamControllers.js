const player = require("../../server/models/playerModel");

const teamController = {
  getMyTeam: async (req, res) => {
    if (!req.session.player) {
      const message = "Vous devez être connecté pour accéder à cette page";
      req.session.message = message;
      res.redirect("/login");
      
      return;
    }

    const team = req.session.player.team;
    // const team = await player.team;

    const pokemonTypes = [];
    const pokemonNameFr = [];

    for (const poke of team) {
      pokemonTypes.push(poke);
    }

    for (let i = 0; i < team.length; i++) {
      const pokemonName = team[i].name; // Utilisez l'ID du Pokémon depuis l'image

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`
      );
      const data = await response.json();

      const frenchName = data.names.find(
        (name) => name.language.name === "fr"
      ).name;
      pokemonNameFr.push(frenchName);
    }
    res.render("team", {
      team: team,
      types: pokemonTypes,
      nameFr: pokemonNameFr,
    });
  },

  addPokemonToTeam: async (req, res) => {
    const team = req.session.team; // récupere l'array Team
    const id = req.params.id; // Récupere l'id du pokémon cliqué
    const currentUrl = req.get("referer"); // permet de resté sur la page en cours

    // Condition : tant que la team ne comporte pas 6 pokémon
    if (team.length < 6) {
      // Alors je push le pokémon selectionné dans la Team
      try {
        const pokemonByOrder = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const pokemon = await pokemonByOrder.json();
        team.push(pokemon);

        res.redirect(currentUrl);
      } catch (error) {
        res.status(500).send(error.message);
      }
      // Sinon un message d'erreur m'indique que mon équipe est pleine.
    } else {
      res
        .send("L'équipe est déjà pleine (limite de 6 Pokémon)")
        .redirect(currentUrl);
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
