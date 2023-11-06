const APIFetch = {
  allPokemon: async function (req, res) {
    try {
      const apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon/"); // Mettez l'identifiant du Pokémon ici
      const pokemons = await apiResponse.json();
      const pokemon = pokemons.results;
      res.render("home", {
        pokemon,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = APIFetch;
