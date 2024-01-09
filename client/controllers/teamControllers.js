const teamController = {
  getMyTeam: async (req, res) => {
    const team = req.session.team;

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
