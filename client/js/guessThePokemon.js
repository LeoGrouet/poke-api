function handleTheGuess() {
  const userGuess = document.getElementById("user-guess").value;
  const pokemonToGuess = document.getElementById("name-to-guess").innerText;

  console.log(userGuess, pokemonToGuess);

  if (
    pokemonToGuess.trim().toLocaleLowerCase() ===
    userGuess.trim().toLocaleLowerCase()
  ) {
    console.log("GG mec");
  } else {
    console.log("T'es bourré ?");
  }
}
