function handleTheGuess() {
  const userGuess = document.getElementById("user-guess").value;
  const pokemonToGuess = document.getElementById("name-to-guess").innerText;
  const pokeImage = document.querySelector(".pokemon-to-find");
  const pokeDiv = document.querySelector(".guess-pokemon-div");
  console.log(userGuess, pokemonToGuess);

  if (
    pokemonToGuess.trim().toLocaleLowerCase() ===
    userGuess.trim().toLocaleLowerCase()
  ) {
    console.log("GG mec");
    pokeImage.style.filter = "contrast(1)";
    const newDiv = document.createElement("div");
    newDiv.innerHTML = "tu as gagné";
    newDiv.classList.add = "winning-div";
    pokeDiv.appendChild(newDiv);
  } else {
    console.log("T'es bourré ?");
    const newDiv = document.createElement("div");
    newDiv.innerHTML = "c'est perdu";
    newDiv.classList.add = "loosing-div";
    pokeDiv.appendChild(newDiv);
  }
}
