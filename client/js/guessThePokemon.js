function handleTheGuess() {
  const userGuess = document.getElementById("user-guess").value;
  const pokemonToGuess = document.getElementById("name-to-guess").innerText;
  const pokeImage = document.querySelector(".pokemon-to-find");
  const pokeDiv = document.querySelector(".guess-pokemon-div");

  if (
    // compare le guess et le nom du pokemon à trouver
    pokemonToGuess.trim().toLocaleLowerCase() ===
    userGuess.trim().toLocaleLowerCase()
  ) {
    // Si le guess et le pokemon concorde , alors on affiche un message de victoire
    console.log("GG mec");
    pokeImage.style.filter = "contrast(1)";
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `tu as gagné, c'était bien ${pokemonToGuess}`;
    newDiv.classList.add = "winning-div";
    pokeDiv.appendChild(newDiv);
    // On enlève l'attribut "onclick" du bouton guess pour empêcher de recliquer dessus pour avoir plusieurs messages de victoire
    document.getElementById("guess-button").removeAttribute("onclick");
    // Puis j'ajoute un bouton pour continuer de jouer avec un autre pokemon
    const newButton = document.createElement("button");
    newButton.innerText = "Un autre !";
    newButton.classList.add("another-pokemon-button");
    pokeDiv.appendChild(newButton);

    newButton.addEventListener("click", () => {
      // Envoyer une requête AJAX pour récupérer les données du prochain Pokémon
      var xhr = new XMLHttpRequest();
      console.log(xhr);
      xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/1", true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          // Mettre à jour l'interface avec les données du prochain Pokémon
          const nouveauPokemon = JSON.parse(xhr.responseText);
          document.querySelector(".pokemon-to-find").src = nouveauPokemon.image;
          document.getElementById("name-to-guess").innerText =
            nouveauPokemon.frenchName;
          document.getElementById("user-guess").value = "";
          console.log(nouveauPokemon);
        }
      };
      xhr.send(nouveauPokemon);
      console.log(xhr.send);
    });
  } else {
    // Sinon on affiche un message de défaite
    console.log("T'es bourré ?");
    const newDiv = document.createElement("div");
    newDiv.innerHTML = "c'est perdu";
    newDiv.classList.add = "loosing-div";
    pokeDiv.appendChild(newDiv);
  }
}
