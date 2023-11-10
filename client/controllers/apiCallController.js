const datamapper = require("../dataMapper/datamapper");

const APIFetch = {
  allPokemon: async (req, res) => {
    try {
      const limit = req.query.limit || 20; // Récupérez la limite depuis la requête (ou utilisez 20 par défaut)
      const offset = req.query.offset || 0; // Récupérez l'offset depuis la requête (ou utilisez 0 par défaut)
      const pokemonsNameResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
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
        limit: limit, // Transmettez la limite à la vue
        offset: offset, // Transmettez l'offset à la vue
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  onePokemonByNumber: async (req, res) => {
    try {
      const pokemonNumber = req.params.order; // Utilisez req.params pour obtenir le nom du Pokémon
      console.log(pokemonNumber);
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
      console.log(url);

      const apiResponse = await fetch(url);
      if (apiResponse.status !== 200) {
        res.status(apiResponse.status).send("Le Pokémon n'a pas été trouvé.");
        return;
      }

      const getPokemonUrl = await apiResponse.json();
      const pokemon = getPokemonUrl;
      console.log(pokemon.id);
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

  getTypes: async (req, res) => {
    try {
      const urlTypes = await fetch(
        `https://pokeapi.co/api/v2/type?limit=18&offset=0`
      );
      const typesJson = await urlTypes.json();
      const types = typesJson.results;
      res.render("types", {
        types,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getPokemonsOfOneType: async (req, res) => {
    try {
      const typeToFind = req.params.type;
      const fetching = await fetch(
        `https://pokeapi.co/api/v2/type/${typeToFind}`
      );
      const fetchingPokemonsofThisType = await fetching.json();
      const pokemonFetchs = fetchingPokemonsofThisType.pokemon;

      const pokemons = [];
      for (const pokemon of pokemonFetchs) {
        pokemons.push(pokemon.pokemon);
        const infosPokemon = await fetch(
          `https://pokeapi.co/api/v2/type/${pokemon.pokemon.url}`
        );
        const info = await infosPokemon.name;
        console.log(info);
      }

      res.render("home", {});
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = APIFetch;
