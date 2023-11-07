const datamapper = require("../dataMapper/datamapper");

const APIFetch = {
  allPokemon: async function (req, res) {
    try {
      const pokemonsNameResponse = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?offset0&limit=20"
      );
      const pokemons = await pokemonsNameResponse.json();
      const pokemonData = pokemons.results;
      // const types = pokemons.

      // Créez un tableau pour stocker les types des pokemons
      const pokemonTypes = [];

      // Créez un tableau pour stocker les URL des images
      const pokemonImageURLs = [];

      // Itérez sur les données des Pokémon pour obtenir leurs URL
      for (const pokemon of pokemonData) {
        pokemonImageURLs.push(pokemon.url);
      }

      // Maintenant, itérez sur les URLs des images pour les récupérer
      const pokemonImages = [];
      for (const url of pokemonImageURLs) {
        const imageResponse = await fetch(url);
        const imageData = await imageResponse.json();
        pokemonImages.push(imageData);
        pokemonTypes.push(imageData.types);
      }
      res.render("home", {
        pokemon: pokemonData,
        pokeImg: pokemonImages,
        pokeType: pokemonTypes,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  onePokemonByName: async function (req, res) {
    try {
      const pokemonName = req.params.name; // Utilisez req.params pour obtenir le nom du Pokémon
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      const apiResponse = await fetch(url);

      if (apiResponse.status !== 200) {
        res.status(apiResponse.status).send("Le Pokémon n'a pas été trouvé.");
        return;
      }

      const getPokemonUrl = await apiResponse.json();
      const pokemon = getPokemonUrl;
      console.log(pokemon);

      const stats = pokemon.stats;
      const statTable = [];
      for (const stat of stats) {
        const test = { name: stat.stat.name, base_stat: stat.base_stat };
        statTable.push(test);
      }

      res.render("pokemon", {
        pokemon,
        statTable,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = APIFetch;
