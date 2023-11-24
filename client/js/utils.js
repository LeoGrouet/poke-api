function loggedController() {
  const teambutton = document.getElementById("team-nav");
  if (!session) {
    teambutton.style.display = "none";
  }
}
loggedController();

async function searchbarFunction(req, res) {
  let valeurInput = document.getElementById("search-bar").value;
  const input = document.getElementById("search-bar");
  try {
    const pokemonName = valeurInput; // Utilisez req.params pour obtenir le nom du Pokémon
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

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
    res.render("home", {
      pokemon,
      statTable,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }

  input.addEventListener("keyup", () => {
    console.log("Valeur de l'entrée :", valeurInput);
  });
}
