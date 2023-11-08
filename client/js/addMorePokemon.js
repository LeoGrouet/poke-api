// Cliqué sur le span pour ajouté des pokemons au pokedex visible
const clickable = document.getElementById("loader-pokemon");

clickable.addEventListener("click", () => {
  fetchMorePokemon();
});

// Ce click renvoie la fonction fetchMorePokemon
async function fetchMorePokemon() {
  let limit = 18;
}
// La fonction fectMorePokemon reprend la fonction apiCallController en rajoutant +10 ou 20 a la limit dans l'URL
