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
      console.log(pokemonName);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`
      );
      const data = await response.json();

      const frenchName = data.names.find(
        (name) => name.language.name === "fr"
      ).name;
      pokemonNameFr.push(frenchName);
    }
    console.log(pokemonNameFr);

    res.render("team", {
      team: team,
      types: pokemonTypes,
      nameFr: pokemonNameFr,
    });
  },

  deletePokemonOfTeam: async (req, res) => {
    try {
      const id = req.params.id;

      const team = req.session.team;

      console.log(team);
      res.redirect("/team");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = teamController;
