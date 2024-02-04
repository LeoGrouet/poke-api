const Pokemon = require("../../serveur/models/pokemonModel");

const gamesController = {
  whosThePokemon: async (req, res) => {
    const randomNumber = Math.floor(Math.random() * (150 - 1) + 1);
    console.log(randomNumber);
    const url = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
    console.log(url);
    const apiResponse = await fetch(url);

    const pokemonData = await apiResponse.json();

    const pokemonToFind = {
      name: pokemonData.name,
      number: pokemonData.order,
      image: pokemonData.sprites.back_default,
    };

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonToFind.name}/`
    );
    const data = await response.json();

    const frenchName = data.names.find(
      (name) => name.language.name === "fr"
    ).name;

    try {
      await Pokemon.deleteMany();
      await Pokemon.insertMany({
        name: frenchName,
        image: pokemonToFind.image,
      });
      console.log("Pokemon successfully send to db");
    } catch (error) {
      console.log("Houston, on a un ptit probleme");
    }
    res.render("guessThePokemon", {
      // Pokemon as pokemonToFind
      pokemon: pokemonToFind,
      frenchName,
    });
  },
};

module.exports = gamesController;
