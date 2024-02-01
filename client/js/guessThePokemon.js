function handleTheGuess() {
  const userGuess = document.getElementById("user-guess").value;
  const pokemonToGuess = document.getElementById("name-to-guess").innerText;
  const pokeImage = document.querySelector(".pokemon-to-find");
  console.log(userGuess, pokemonToGuess);

  if (
    pokemonToGuess.trim().toLocaleLowerCase() ===
    userGuess.trim().toLocaleLowerCase()
  ) {
    console.log("GG mec");
    pokeImage.style.filter = "contrast(1)";
  } else {
    console.log("T'es bourré ?");
  }
}
