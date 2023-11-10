document.addEventListener("DOMContentLoaded", function () {
  const loaderButton = document.getElementById("loader-pokemon");

  loaderButton
    .addEventListener("click", async function (req, res) {
      // Récupérez la limite actuelle et l'offset
      const currentLimit = parseInt(loaderButton.getAttribute("data-limit"));
      const currentOffset = parseInt(loaderButton.getAttribute("data-offset"));
      const pokemonContainer = document.getElementsByClassName("pokedex");
      console.log(currentLimit);
      // Augmentez la limite, par exemple, de 20
      const newLimit = parseInt(currentLimit + 20);
      console.log(newLimit);
      // Mettez à jour l'attribut data-limit sur le bouton
      loaderButton.setAttribute("data-limit", newLimit);

      // Appelez la fonction allPokemon avec la nouvelle limite
      const morePokemonsNameResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${newLimit}&offset=${currentOffset}`
      );

      const pokemons = await morePokemonsNameResponse.json();
      console.log(pokemons);
      const pokemonData = pokemons.results;

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
      // Mettez à jour la vue avec les nouveaux Pokémon
      pokemonContainer.innerHTML = pokemonData;
      res.render("home", {
        pokemon: pokemonData,
        pokeImg: pokemonImages,
        pokeType: pokemonTypes,
      });
      // Assurez-vous d'ajouter les Pokémon supplémentaires au contenu existant, au lieu de tout remplacer
      // Vous devrez peut-être ajuster la logique de mise à jour de la vue en conséquence
    })
    .catch((error) => {
      console.error(
        "Erreur lors de la récupération de plus de Pokémon :",
        error
      );
    });
});
