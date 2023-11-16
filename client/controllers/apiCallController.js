// const datamapper = require("../../serveur/datamapper");

const APIFetch = {
  allPokemon: async (req, res) => {
    try {
      const limit = req.query.limit || 20;
      const offset = req.query.offset || 0;
      const pokemonsNameResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
      );

      const pokemons = await pokemonsNameResponse.json();
      const pokemonData = pokemons.results;

      const pokemonTypes = [];
      const pokemonImageURLs = [];
      const pokemonImages = [];
      const pokemonNameFr = [];

      for (const pokemon of pokemonData) {
        pokemonImageURLs.push(pokemon.url);
      }

      for (const url of pokemonImageURLs) {
        const imageResponse = await fetch(url);
        const imageData = await imageResponse.json();
        pokemonImages.push(imageData);
        pokemonTypes.push(imageData.types);
      }

      for (let i = 0; i < pokemonData.length; i++) {
        const pokemonName = pokemonData[i].name; // Utilisez l'ID du Pokémon depuis l'image

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`
        );
        const data = await response.json();

        const frenchName = data.names.find(
          (name) => name.language.name === "fr"
        ).name;
        pokemonNameFr.push(frenchName);
      }

      res.render("home", {
        baseUrl: "",
        pokemon: pokemonData,
        pokeImg: pokemonImages,
        pokeType: pokemonTypes,
        pokeNameFr: pokemonNameFr, // Ajoutez le nom français des Pokémon à la vue
        limit: limit,
        offset: offset,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  onePokemonByNumber: async (req, res) => {
    try {
      const pokemonNumber = req.params.order; // Utilisez req.params pour obtenir le nom du Pokémon
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;

      const apiResponse = await fetch(url);
      if (apiResponse.status !== 200) {
        res.status(apiResponse.status).send("Le Pokémon n'a pas été trouvé.");
        return;
      }

      const getPokemonUrl = await apiResponse.json();
      const pokemon = getPokemonUrl;

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
        baseUrl: "",
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
      const pokemons = await fetching.json();
      const results = pokemons.pokemon;

      // Créez un tableau pour stocker les types des pokemons
      const pokemonTypes = [];

      // Créez un tableau pour stocker les URL des images
      const pokemonImageURLs = [];

      // Itérez sur les données des Pokémon pour obtenir leurs URL
      for (const pokemon of results) {
        pokemonImageURLs.push(pokemon.pokemon.url);
      }

      // Maintenant, itérez sur les URLs des images pour les récupérer
      const pokemonImages = [];
      for (let i = 0; i < 10; i++) {
        const url = pokemonImageURLs[i];
        const imageResponse = await fetch(url);
        const imageData = await imageResponse.json();
        pokemonImages.push(imageData);
        pokemonTypes.push(imageData.types);
      }

      res.render("home", {
        baseUrl: "",
        pokeImg: pokemonImages,
        pokeType: pokemonTypes,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  addPokemonToTeam: async (req, res) => {
    const team = req.session.team;
    const id = req.params.id;
    const currentUrl = req.get("referer"); // permet de resté sur la page en cours

    if (team.length < 6) {
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
    } else {
      res.status(400).send("L'équipe est déjà pleine (limite de 6 Pokémon).");
    }
  },
};

module.exports = APIFetch;
